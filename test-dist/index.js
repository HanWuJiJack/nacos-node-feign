"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncGetFeign = void 0;
const { resolve } = require("path");
const request = require("../utils/request");
// 
const threadsPools = require("../utils/threadsPools");
const TPools = new threadsPools(resolve(__dirname, "../utils/seprateThread.js"));
// http://127.0.0.1:8848/nacos/v1/auth/users/?username=nacos&password=nacos&pageNo=1&pageSize=1
class feign {
    constructor({ serverList, namespace, groupName, serviceName, username, password }) {
        this.groupName = groupName;
        this.serverList = serverList;
        this.namespaceId = namespace;
        this.serviceName = serviceName;
        this.MicroServerList = [];
        this.acceptRequireSum = 0;
        this.weightSum = 0;
        this.runData = null;
        this.refreshTime = 15000;
        this.threadsinitsum = 0; //重试次数
        this.accessToken = "";
        this.username = username;
        this.password = password;
        this.threadsinit();
        setInterval(() => {
            this.threadsinit();
        }, this.refreshTime);
    }
    // 负载均衡算法
    LoadBalance() {
        let maxIndex = 0;
        let maxNum = 0;
        for (const index in this.MicroServerList) {
            if (Object.prototype.hasOwnProperty.call(this.MicroServerList, index)) {
                let item = this.MicroServerList[index];
                // 获取权重概率
                item.weightPercentage = ~~((item.weight * 100) / this.weightSum);
                if (!item.requestNum)
                    item.requestNum = 0;
                // 计算将要运行微服务的概率
                if (this.acceptRequireSum === 0) {
                    item.willRequirePercentage = ~~((this.weightSum * 100) /
                        item.weightPercentage);
                }
                else {
                    item.willRequirePercentage = ~~((item.requestNum * this.weightSum * 100) /
                        item.weightPercentage);
                }
                if (Number(index) === 0) {
                    maxNum = item.willRequirePercentage;
                    maxIndex = Number(index);
                }
                if (maxNum > item.willRequirePercentage) {
                    maxNum = item.willRequirePercentage;
                    maxIndex = Number(index);
                }
            }
        }
        this.MicroServerList[maxIndex].requestNum += 1;
        this.acceptRequireSum += 1;
        return Object.assign({}, this.MicroServerList[maxIndex]);
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken } = yield request({
                baseURL: this.serverList,
                url: "/nacos/v1/auth/login",
                method: "post",
                params: {
                    username: this.username,
                    password: this.password,
                },
            });
            this.accessToken = accessToken;
        });
    }
    threadsinit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.username && this.password) {
                yield this.getToken();
            }
            TPools.run({
                baseURL: this.serverList,
                url: "/nacos/v1/ns/instance/list",
                params: {
                    serviceName: this.serviceName,
                    namespaceId: this.namespaceId,
                    groupName: this.groupName,
                    healthyOnly: true,
                    "accessToken": this.accessToken
                },
                refreshTime: this.refreshTime,
            }, (err, res) => {
                if (err) {
                    throw new Error("获取微服务列表失败，请检测你的nacos！");
                }
                if (res.status === 403) {
                    throw new Error("nacos-node-feign: 请配置nacos用户名密码");
                }
                if (this.MicroServerList.length !== res.hosts.length) {
                    this.MicroServerList = res.hosts || [];
                    if (this.MicroServerList.length === 0) {
                        throw new Error("微服务已经全部宕机！");
                    }
                    this.threadsinitsum = 0;
                    console.log("nacos-node-feign: 微服务列表获取成功！");
                    this.weightSum = this.MicroServerList.map((item) => item.weight).reduce((prev, curr) => {
                        return prev + curr;
                    });
                }
                else if (this.MicroServerList.length === 0) {
                    if (this.threadsinitsum > 2) {
                        throw new Error("微服务已经全部宕机！");
                    }
                    setTimeout(() => {
                        this.threadsinitsum += 1;
                        this.threadsinit();
                    }, 1000);
                }
            });
        });
    }
    closeMircoServer({ ip, port }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.MicroServerList = this.MicroServerList.filter((item) => {
                return item.ip != ip || item.port != port;
            });
            return this.run(this.runData);
        });
    }
    run({ url, params, data, method, timeout }) {
        this.runData = { url, params, data, method, timeout };
        const curMircoServer = this.LoadBalance();
        return new Promise((resolve) => {
            request({
                baseURL: `http://${curMircoServer.ip}:${curMircoServer.port}`,
                url,
                params,
                data,
                method,
                timeout,
            }).then((res) => {
                resolve(res);
            }, (err) => {
                if (err.code && err.code === 50002) {
                    this.closeMircoServer(curMircoServer).then((res) => {
                        resolve(res);
                    });
                }
                else {
                    resolve(err);
                }
            });
        });
    }
}
const asyncGetFeign = ({ serverList, namespace, groupName, serviceName, username, password }) => {
    return new Promise((resolve, reject) => {
        const feign_ = new feign({
            serverList,
            namespace,
            groupName,
            serviceName,
            username,
            password
        });
        // feign_.init().then(() => {
        //   resolve(feign_);
        // });
        resolve(feign_);
    });
};
exports.asyncGetFeign = asyncGetFeign;
