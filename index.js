const request = require("./utils/request");

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
  // 接管resolve
  requestResolve;
  // 接管reject
  requestReject;
  constructor({ serverList, namespace, groupName, serviceName }) {
    this.groupName = groupName;
    this.serverList = serverList;
    this.namespaceId = namespace;
    this.serviceName = serviceName;
    this.MicroServerList = [];
    this.acceptRequireSum = 0;
    this.weightSum = 0;
    this.runData = null;
    this.requestResolve = null;
    this.requestReject = null;
  }
  async getMicroServerList() {
    try {
      const res = await request({
        baseURL: this.serverList,
        url: "/nacos/v1/ns/instance/list",
        params: {
          serviceName: this.serviceName,
          namespaceId: this.namespaceId,
          groupName: this.groupName,
          healthyOnly: true,
        },
      });
    //   console.log("getMicroServerList=>", res.data);
      if (
        this.MicroServerList.length > 0 &&
        res.data.hosts &&
        res.data.hosts.length > 0
      ) {
        // 保护之前已存在的值
        res.data.hosts.forEach((item) => {
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
        // this.MicroServerList = res.data.hosts.filter((item) => !!item.weight);
        this.MicroServerList = res.data.hosts
        // console.error("保护MicroServerList数据", this.MicroServerList);
      } else {
        // console.log("55555555")
        this.MicroServerList = res.data.hosts || [];
      }
    } catch (error) {
      console.error("获取微服务列表失败，请检测你的nacos！", error);
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
    this.MicroServerList[maxIndex].requestNum =
      this.MicroServerList[maxIndex].requestNum + 1;
    this.acceptRequireSum = this.acceptRequireSum + 1;
    // console.log(maxIndex, maxNum);
    // console.log("this.acceptRequireSum", this.acceptRequireSum);
    // console.log("this.MicroServerList", this.MicroServerList);
    return { ...this.MicroServerList[maxIndex] };
  }

  async init() {
    await this.getMicroServerList();
    this.weightSum = this.MicroServerList.map((item) => item.weight).reduce(
      (prev, curr) => {
        return prev + curr;
      }
    );
    // console.log("this.weightSum", this.weightSum);
  }
  async request({ url, params, data, method, timeout }) {
    this.runData = { url, params, data, method, timeout };
    return new Promise((resolve, reject) => {
      this.requestResolve = resolve;
      this.requestReject = reject;
      this.run(this.runData).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  async closeMircoServer({ ip, port }) {
    // console.log(ip, port);
    const closeData = await request({
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
    const curMircoServer = this.LoadBalance();
    // console.log("curMircoServer", curMircoServer);
    return new Promise((resolve, reject) => {
      request({
        baseURL: `http://${curMircoServer.ip}:${curMircoServer.port}`,
        url,
        params,
        data,
        method,
        timeout,
      }).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          //   console.log("err", err);
          if (err === "timeout") {
            this.init().then(
              () => {
                this.run(this.runData);
              },
              (error) => {
                reject(error);
              }
            );
          } else if (err === "ECONNREFUSED") {
            this.closeMircoServer(curMircoServer).then(
              (res) => {
                resolve(res);
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            reject(err);
          }
        }
      );
    });
  }
}
const run = async ({ serverList, namespace, groupName, serviceName }) => {
  // const feign_: any = new feign({ serverList: "http://127.0.0.1:8848", serviceName: "ADONIS_NODE_" })
  const feign_ = new feign({
    serverList,
    namespace,
    groupName,
    serviceName,
  });
  await feign_.init();
//   for (let i = 0; i < 5; i++) {
//     feign_.request({ url: "/api/posts" }).then(
//       (res) => {
//         console.log(`序列${i}：`, res.data);
//       },
//       (err) => {
//         console.log(`err序列${i}：`, err);
//       }
//     );
//   }
  return feign_;
};

// run({ serverList: "http://127.0.0.1:8848", serviceName: "ADONIS_NODE_" });
module.exports = run;
