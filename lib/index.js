"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncGetFeign = void 0;
var resolve = require("path").resolve;
var request = require("../utils/request");
// 
var threadsPools = require("../utils/threadsPools");
var TPools = new threadsPools(resolve(__dirname, "../utils/seprateThread.js"));
var feign = /** @class */ (function () {
    function feign(_a) {
        var serverList = _a.serverList, namespace = _a.namespace, groupName = _a.groupName, serviceName = _a.serviceName;
        this.groupName = groupName;
        this.serverList = serverList;
        this.namespaceId = namespace;
        this.serviceName = serviceName;
        this.MicroServerList = [];
        this.acceptRequireSum = 0;
        this.weightSum = 0;
        this.runData = null;
        this.refreshTime = 15000;
    }
    // 负载均衡算法
    feign.prototype.LoadBalance = function () {
        var maxIndex = 0;
        var maxNum = 0;
        for (var index in this.MicroServerList) {
            if (Object.prototype.hasOwnProperty.call(this.MicroServerList, index)) {
                var item = this.MicroServerList[index];
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
        return __assign({}, this.MicroServerList[maxIndex]);
    };
    feign.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request({
                                baseURL: this.serverList,
                                url: "/nacos/v1/ns/instance/list",
                                params: {
                                    serviceName: this.serviceName,
                                    namespaceId: this.namespaceId,
                                    groupName: this.groupName,
                                    healthyOnly: true,
                                },
                            })];
                    case 1:
                        data = _a.sent();
                        if (data.hosts.length === 0) {
                            throw new Error("请先注册微服务到nacos");
                        }
                        if (data.hosts.length > this.MicroServerList.length) {
                            this.MicroServerList = data.hosts || [];
                            this.weightSum = this.MicroServerList.map(function (item) { return item.weight; }).reduce(function (prev, curr) {
                                return prev + curr;
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        // console.error("获取微服务列表失败，请检测你的nacos！", error);
                        throw new Error("获取微服务列表失败，请检测你的nacos！");
                    case 3:
                        // 通过开启一个线程去独立 每个15秒刷新一次配置
                        setTimeout(function () {
                            _this.threadsinit();
                        }, this.refreshTime);
                        return [2 /*return*/];
                }
            });
        });
    };
    feign.prototype.threadsinit = function () {
        var _this = this;
        TPools.run({
            baseURL: this.serverList,
            url: "/nacos/v1/ns/instance/list",
            params: {
                serviceName: this.serviceName,
                namespaceId: this.namespaceId,
                groupName: this.groupName,
                healthyOnly: true,
            },
            refreshTime: this.refreshTime,
        }, function (err, res) {
            if (err) {
                throw new Error("获取微服务列表失败，请检测你的nacos！");
            }
            if (_this.MicroServerList.length !== res.hosts.length) {
                _this.MicroServerList = res.hosts || [];
                if (_this.MicroServerList.length === 0) {
                    throw new Error("请先注册微服务到nacos");
                }
                _this.weightSum = _this.MicroServerList.map(function (item) { return item.weight; }).reduce(function (prev, curr) {
                    return prev + curr;
                });
            }
        });
        // 通过开启一个线程去独立 每个15秒刷新一次配置
        setTimeout(function () {
            _this.threadsinit();
        }, this.refreshTime);
    };
    feign.prototype.closeMircoServer = function (_a) {
        var ip = _a.ip, port = _a.port;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.MicroServerList = this.MicroServerList.filter(function (item) {
                    return item.ip != ip || item.port != port;
                });
                return [2 /*return*/, this.run(this.runData)];
            });
        });
    };
    feign.prototype.run = function (_a) {
        var _this = this;
        var url = _a.url, params = _a.params, data = _a.data, method = _a.method, timeout = _a.timeout;
        this.runData = { url: url, params: params, data: data, method: method, timeout: timeout };
        var curMircoServer = this.LoadBalance();
        return new Promise(function (resolve) {
            request({
                baseURL: "http://".concat(curMircoServer.ip, ":").concat(curMircoServer.port),
                url: url,
                params: params,
                data: data,
                method: method,
                timeout: timeout,
            }).then(function (res) {
                console.log(res);
                resolve(res);
            }, function (err) {
                if (err.code && err.code === 50002) {
                    _this.closeMircoServer(curMircoServer).then(function (res) {
                        resolve(res);
                    });
                }
                else {
                    resolve(err);
                }
            });
        });
    };
    return feign;
}());
var asyncGetFeign = function (_a) {
    var serverList = _a.serverList, namespace = _a.namespace, groupName = _a.groupName, serviceName = _a.serviceName;
    return new Promise(function (resolve, reject) {
        var feign_ = new feign({
            serverList: serverList,
            namespace: namespace,
            groupName: groupName,
            serviceName: serviceName,
        });
        feign_.init().then(function () {
            resolve(feign_);
        });
    });
};
exports.asyncGetFeign = asyncGetFeign;
