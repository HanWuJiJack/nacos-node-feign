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
const threadsPools = require("../utils/asyncthreadsPools");
const redis_1 = require("./utils/redis");
const TPools = new threadsPools(resolve(__dirname, "../utils/seprateThread.js"));
// http://127.0.0.1:8848/nacos/v1/auth/users/?username=nacos&password=nacos&pageNo=1&pageSize=1
class feign {
    constructor({ serverList, namespace, groupName, serviceName, username, password, rhost = "127.0.0.1", rport = 6379, rusername = "", rpassword = "", rdb = 0 }) {
        this.groupName = groupName;
        this.serverList = serverList;
        this.namespaceId = namespace;
        this.serviceName = serviceName;
        this.runData = null;
        this.refreshTime = 20 * 60 * 1000;
        // this.refreshTime = 10 * 1000;
        this.threadsinitsum = 0; //重试次数
        this.accessToken = "";
        this.username = username;
        this.password = password;
        this.redisKey = `${this.namespaceId}-${this.serviceName}-${this.groupName}`;
        this.redis = new redis_1.redisUtils(rhost, rport, rusername, rpassword, rdb);
        this.threadsinit();
    }
    // 负载均衡算法
    LoadBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取redis信息 进行同步
            const info = yield this.redis.get(this.redisKey);
            if (info.MicroServerList.length === 0) {
                throw new Error("[nacos-node-feign]:未获取微服务列表！");
            }
            let maxIndex = 0;
            let maxNum = 0;
            const healthyArr = info.MicroServerList.filter((item) => {
                return !item.nohealthy_;
            });
            if (healthyArr.length === 0) {
                throw new Error("[nacos-node-feign]:微服务已经全部宕机！");
            }
            for (const index in healthyArr) {
                if (Object.prototype.hasOwnProperty.call(healthyArr, index)) {
                    let item = healthyArr[index];
                    // 获取权重概率
                    item.weightPercentage = ~~((item.weight * 100) / info.weightSum);
                    if (!item.requestNum)
                        item.requestNum = 0;
                    // 计算将要运行微服务的概率
                    if (info.acceptRequireSum === 0) {
                        item.willRequirePercentage = ~~((100) /
                            item.weightPercentage);
                    }
                    else {
                        item.willRequirePercentage = ~~((item.requestNum * 100) /
                            item.weightPercentage);
                    }
                    if (Number(index) === 0) {
                        maxNum = item.willRequirePercentage;
                        maxIndex = Number(index);
                    }
                    // 取到最小值
                    if (maxNum > item.willRequirePercentage) {
                        maxNum = item.willRequirePercentage;
                        maxIndex = Number(index);
                    }
                }
            }
            healthyArr[maxIndex].requestNum += 1;
            healthyArr[maxIndex].AuthenticRequestNum += 1;
            info.acceptRequireSum += 1;
            info.AuthenticAcceptRequireSum += 1;
            yield this.redis.set(this.redisKey, info);
            return Object.assign({}, healthyArr[maxIndex]);
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield request({
                    baseURL: this.serverList,
                    url: "/nacos/v1/auth/login",
                    method: "post",
                    params: {
                        username: this.username,
                        password: this.password,
                    },
                });
                // console.log("=>res", res)
                this.accessToken = res.accessToken;
            }
            catch (error) {
                if (error.code && error.code > 50000) {
                    throw new Error("[nacos-node-feign]:请检测你的nacos是否启动成功！");
                }
                throw error;
            }
        });
    }
    threadsinit() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(this.threadsinitsum, new Date().getTime())
            if (this.username && this.password) {
                yield this.getToken();
            }
            // 获取redis信息 进行同步
            const info = yield this.redis.get(this.redisKey);
            let res;
            try {
                res = yield TPools.run({
                    baseURL: this.serverList,
                    url: "/nacos/v1/ns/instance/list",
                    params: {
                        serviceName: this.serviceName,
                        namespaceId: this.namespaceId,
                        groupName: this.groupName,
                        healthyOnly: true,
                        "accessToken": this.accessToken
                    }
                });
            }
            catch (error) {
                throw new Error("[nacos-node-feign]:获取微服务列表失败，请检测你的nacos！");
            }
            if (res.status === 403) {
                throw new Error("[nacos-node-feign]: 请配置nacos用户名密码");
            }
            if (res.hosts.length === 0) {
                // 10次重试机会
                if (this.threadsinitsum > 10) {
                    throw new Error("[nacos-node-feign]:请将微服务注册到nacos!");
                }
                setTimeout(() => {
                    this.threadsinitsum += 1;
                    this.threadsinit();
                }, 1000);
                return;
            }
            this.threadsinitsum = 0;
            console.log("[nacos-node-feign]: 微服务列表获取成功！");
            const weightSum_ = res.hosts.map((item) => item.weight).reduce((prev, curr) => {
                return prev + curr;
            });
            let isUpdata = 0;
            if (weightSum_ != info.weightSum) {
                isUpdata += 1;
                info.weightSum = weightSum_;
            }
            if (info.acceptRequireSum != 0 && !info.acceptRequireSum) {
                info.acceptRequireSum = 0;
                info.AuthenticAcceptRequireSum = 0;
            }
            // 如何还能获取微服务，则恢复健康状态
            if (info.MicroServerList && info.MicroServerList.length > 0) {
                res.hosts.forEach((item) => {
                    const val = info.MicroServerList.find((val) => val.instanceId === item.instanceId);
                    if (val && val.nohealthy_) {
                        isUpdata += 1;
                        val.nohealthy_ = false;
                    }
                });
                if (isUpdata > 0) {
                    info.acceptRequireSum = 0;
                    info.MicroServerList.forEach((item) => {
                        item.requestNum = 0;
                    });
                }
            }
            else {
                info.MicroServerList = [];
            }
            // 微服务列表是否有变化
            let change = false;
            if (info.MicroServerList.length != res.hosts.length) {
                change = true;
            }
            if (!change) {
                for (const key in info.MicroServerList) {
                    if (Object.prototype.hasOwnProperty.call(info.MicroServerList, key)) {
                        if (info.MicroServerList[key].instanceId !== res.hosts[key].instanceId) {
                            change = true;
                        }
                    }
                }
            }
            if (change) {
                isUpdata += 1;
                info.acceptRequireSum = 0;
                res.hosts.forEach((val) => {
                    val.requestNum = 0;
                    val.AuthenticRequestNum = 0;
                    return val;
                });
                info.MicroServerList = res.hosts.map((item) => {
                    const el = info.MicroServerList.find((val) => val.instanceId === item.instanceId);
                    if (el) {
                        el.requestNum = 0;
                        return el;
                    }
                    else {
                        return item;
                    }
                });
            }
            if (isUpdata > 0) {
                yield this.redis.set(this.redisKey, info);
                // console.log("info.MicroServerList", await this.redis.get(this.redisKey))
            }
            // 刷新服务列表
            setTimeout(() => {
                this.threadsinit();
            }, this.refreshTime);
            // console.log("info.MicroServerList", await this.redis.get(this.redisKey))
        });
    }
    closeMircoServer({ ip, port }) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.redis.get(this.redisKey);
            info.MicroServerList.forEach((el) => {
                if (el.ip == ip && el.port == port) {
                    el.nohealthy_ = true;
                }
                return el;
            });
            yield this.redis.set(this.redisKey, info);
            return this.run(this.runData);
        });
    }
    run({ url, params, data, method, timeout }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.runData = { url, params, data, method, timeout };
            const curMircoServer = yield this.LoadBalance();
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
        });
    }
}
const asyncGetFeign = ({ serverList, namespace = "public", groupName = "DEFAULT_GROUP", serviceName = "_NODE_", username, password, rhost = "192.168.10.135", rport = 6379, rusername = "", rpassword = "", rdb = 0 }) => {
    return new Promise((resolve, reject) => {
        const feign_ = new feign({
            serverList,
            namespace,
            groupName,
            serviceName,
            username,
            password,
            rhost,
            rport,
            rusername,
            rpassword,
            rdb
        });
        resolve(feign_);
    });
};
exports.asyncGetFeign = asyncGetFeign;
