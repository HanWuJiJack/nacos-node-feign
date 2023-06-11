const { resolve } = require("path");
const request = require("./utils/request");
const threadsPools = require("./threadsPools");

const TPools = new threadsPools(resolve(__dirname, "./seprateThread.js"));

class feign {
  serverList;
  namespaceId;
  groupName;
  MicroServerList;
  serviceName;
  // 总共接受请求数目
  acceptRequireSum;
  // 权重和
  weightSum;

  // 参数缓存
  runData;
  constructor({ serverList, namespace, groupName, serviceName }) {
    this.groupName = groupName;
    this.serverList = serverList;
    this.namespaceId = namespace;
    this.serviceName = serviceName;
    this.MicroServerList = [];
    this.acceptRequireSum = 0;
    this.weightSum = 0;
    this.runData = null;
  }
  async getMicroServerList() {
    try {
      // const res = await request({
      //   baseURL: this.serverList,
      //   url: "/nacos/v1/ns/instance/list",
      //   params: {
      //     serviceName: this.serviceName,
      //     namespaceId: this.namespaceId,
      //     groupName: this.groupName,
      //     healthyOnly: true,
      //   },
      // });
      const data = await TPools.run({
        baseURL: this.serverList,
        url: "/nacos/v1/ns/instance/list",
        params: {
          serviceName: this.serviceName,
          namespaceId: this.namespaceId,
          groupName: this.groupName,
          healthyOnly: true,
        },
      });
      // console.log("getMicroServerList=>", data);
      if (
        this.MicroServerList.length > 0 &&
        data.hosts &&
        data.hosts.length > 0
      ) {
        // 保护之前已存在的值
        data.hosts.forEach((item) => {
          for (const key in this.MicroServerList) {
            if (
              Object.prototype.hasOwnProperty.call(this.MicroServerList, key)
            ) {
              const element = this.MicroServerList[key];
              if (element.instanceId === item.instanceId) {
                item = { ...item, ...element };
              }
            }
          }
          return item;
        });
        // this.MicroServerList = data.hosts.filter((item) => !!item.weight);
        this.MicroServerList = data.hosts;
        // console.error("保护MicroServerList数据", this.MicroServerList);
      } else {
        // console.log("55555555")
        this.MicroServerList = data.hosts || [];
      }
    } catch (error) {
      // console.error("获取微服务列表失败，请检测你的nacos！", error);
      throw new Error("获取微服务列表失败，请检测你的nacos！");
    }
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
        // 计算将要运行微服务的概率
        if (this.acceptRequireSum === 0) {
          item.willRequirePercentage = ~~(
            (this.weightSum * 100) /
            item.weightPercentage
          );
          item.requestNum = 0;
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
    await this.getMicroServerList();
    if (this.MicroServerList.length === 0) {
      throw new Error("请先注册微服务到nacos");
    }
    this.weightSum = this.MicroServerList.map((item) => item.weight).reduce(
      (prev, curr) => {
        return prev + curr;
      }
    );
  }
  async closeMircoServer({ ip, port }) {
    // console.log(ip, port);
    // const closeData = await request({
    //   baseURL: this.serverList,
    //   url: "/nacos/v1/ns/instance",
    //   method: "post",
    //   params: {
    //     serviceName: this.serviceName,
    //     namespaceId: this.namespaceId,
    //     groupName: this.groupName,
    //     ip,
    //     port,
    //     healthy: false,
    //     enabled: false,
    //     weight: 0,
    //   },
    // });
    await TPools.run({
      baseURL: this.serverList,
      url: "/nacos/v1/ns/instance",
      method: "post",
      params: {
        serviceName: this.serviceName,
        namespaceId: this.namespaceId,
        groupName: this.groupName,
        ip,
        port,
        healthy: false,
        enabled: false,
        weight: 0,
      },
    });
    // console.log(closeData.data);
    await this.init();
    return this.run(this.runData);
  }
  run({ url, params, data, method, timeout }) {
    this.runData = { url, params, data, method, timeout };
    const curMircoServer = this.LoadBalance();
    // console.log("curMircoServer", curMircoServer);
    return new Promise((resolve) => {
      TPools.run({
        baseURL: `http://${curMircoServer.ip}:${curMircoServer.port}`,
        url,
        params,
        data,
        method,
        timeout,
      }).then((res) => {
        console.log("res", res);
        if (res.code && res.code === 50002) {
          this.closeMircoServer(curMircoServer).then((res) => {
            resolve(res);
          });
        } else {
          resolve(res);
        }
      });
    });
  }
}

const asyncGetFeign = ({ serverList, namespace, groupName, serviceName }) => {
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
module.exports = {
  asyncGetFeign,
};
