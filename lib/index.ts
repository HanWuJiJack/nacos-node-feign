import { InstanceCloseMircoServerType, InstanceFeignType, InstanceServerType, interfaceAsyncGetFeign } from "./interface";
const { resolve } = require("path");
const request = require("../utils/request");
const threadsPools = require("../utils/threadsPools");
const TPools = new threadsPools(resolve(__dirname, "../utils/seprateThread.js"));

class feign {
  private serverList;
  private namespaceId;
  private groupName;
  private MicroServerList: any[];
  private serviceName;
  // 总共接受请求数目
  private acceptRequireSum;
  // 权重和
  private weightSum;
  // 参数缓存
  private runData: any;
  private refreshTime;
  constructor({ serverList, namespace, groupName, serviceName }: InstanceFeignType) {
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
  private LoadBalance() {
    let maxIndex = 0;
    let maxNum = 0;
    for (const index in this.MicroServerList) {
      if (Object.prototype.hasOwnProperty.call(this.MicroServerList, index)) {
        let item = this.MicroServerList[index];
        // 获取权重概率
        item.weightPercentage = ~~((item.weight * 100) / this.weightSum);

        if (!item.requestNum) item.requestNum = 0;
        // 计算将要运行微服务的概率
        if (this.acceptRequireSum === 0) {
          item.willRequirePercentage = ~~(
            (this.weightSum * 100) /
            item.weightPercentage
          );
        } else {
          item.willRequirePercentage = ~~(
            (item.requestNum * this.weightSum * 100) /
            item.weightPercentage
          );
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
    return { ...this.MicroServerList[maxIndex] };
  }

  async init() {
    try {
      const data = await request({
        baseURL: this.serverList,
        url: "/nacos/v1/ns/instance/list",
        params: {
          serviceName: this.serviceName,
          namespaceId: this.namespaceId,
          groupName: this.groupName,
          healthyOnly: true,
        },
      });
      if (data.hosts.length === 0) {
        throw new Error("请先注册微服务到nacos");
      }
      if (data.hosts.length > this.MicroServerList.length) {
        this.MicroServerList = data.hosts || [];
        this.weightSum = this.MicroServerList.map((item) => item.weight).reduce(
          (prev, curr) => {
            return prev + curr;
          }
        );
      }
    } catch (error) {
      // console.error("获取微服务列表失败，请检测你的nacos！", error);
      throw new Error("获取微服务列表失败，请检测你的nacos！");
    }

    // 通过开启一个线程去独立 每个15秒刷新一次配置
    setTimeout(() => {
      this.threadsinit();
    }, this.refreshTime);
  }
  private threadsinit() {
    TPools.run(
      {
        baseURL: this.serverList,
        url: "/nacos/v1/ns/instance/list",
        params: {
          serviceName: this.serviceName,
          namespaceId: this.namespaceId,
          groupName: this.groupName,
          healthyOnly: true,
        },
        refreshTime: this.refreshTime,
      },
      (err: any, res: any) => {
        if (err) {
          throw new Error("获取微服务列表失败，请检测你的nacos！");
        }
        // console.log("多线程获取res.hosts8888列表=>", res.hosts.length);
        if (this.MicroServerList.length !== res.hosts.length) {
          this.MicroServerList = res.hosts || [];
          if (this.MicroServerList.length === 0) {
            throw new Error("请先注册微服务到nacos");
          }
          this.weightSum = this.MicroServerList.map(
            (item) => item.weight
          ).reduce((prev, curr) => {
            return prev + curr;
          });
        }
      }
    );
    // 通过开启一个线程去独立 每个15秒刷新一次配置
    setTimeout(() => {
      this.threadsinit();
    }, this.refreshTime);
  }

  private async closeMircoServer({ ip, port }: InstanceCloseMircoServerType) {
    this.MicroServerList = this.MicroServerList.filter((item) => {
      return item.ip != ip || item.port != port;
    });
    return this.run(this.runData);
  }
  run({ url, params, data, method, timeout }: InstanceServerType) {
    this.runData = { url, params, data, method, timeout };
    const curMircoServer = this.LoadBalance();
    // console.log("curMircoServer", curMircoServer);
    return new Promise((resolve) => {
      request({
        baseURL: `http://${curMircoServer.ip}:${curMircoServer.port}`,
        url,
        params,
        data,
        method,
        timeout,
      }).then(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          // console.log("err1", err);
          if (err.code && err.code === 50002) {
            this.closeMircoServer(curMircoServer).then((res) => {
              resolve(res);
            });
          } else {
            resolve(err);
          }
        }
      );
    });
  }
}

export const asyncGetFeign: interfaceAsyncGetFeign = ({ serverList, namespace, groupName, serviceName }: InstanceFeignType) => {
  return new Promise((resolve, reject) => {
    const feign_ = new feign({
      serverList,
      namespace,
      groupName,
      serviceName,
    });
    feign_.init().then(() => {
      resolve(feign_);
    });
  });
};
