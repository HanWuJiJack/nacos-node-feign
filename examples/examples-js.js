const proxymircoServer = require("./proxymircoServer");
const asyncGetFeignDefault = require("../index");
const request = require("../utils/request");
const {
  resolve
} = require("path");
const threadsPools = require("../utils/threadsPools");
const threadsLong = require("../utils/threadsLong");
// const TPools = new threadsPools(
//   resolve(__dirname, "../utils/seprateThread.js"));
const TPools = new threadsLong(
  resolve(__dirname, "../utils/seprateThread.js")
);
const {
  asyncGetFeign
} = asyncGetFeignDefault.default;

// 实际转发代码
const proxy = async () => {
  const data = await proxymircoServer.ADONIS_NODE_.run({
    url: "/api/posts",
    // method:"POST"
    // timeout: 5000,
  });
  console.log("data", data);
};

const init = async () => {
  //将转发注册到中心
  proxymircoServer.ADONIS_NODE_ = await asyncGetFeign({
    serverList: "http://127.0.0.1:8848",
    serviceName: "ADONIS_NODE_",
  });
  const before = Date.now();
  console.log(before);
  // 需要转发的代码
  for (let i = 0; i < 10; i++) {
    await proxy();
  }
  console.log(Date.now() - before); // 81736ms
};
init();

// -----------------------------------以下是测试多线程与单线程请求差距----------------------------------------
const testThread = () => {
  const before = Date.now();
  for (let i = 0; i < 7; i++) {
    TPools.run({
        baseURL: "http://192.168.10.135:3336",
        url: "/api/posts",
        timeout: 10000,
        sum: 800,
      },
      (err, res) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log(Date.now() - before);
          console.log("res",res);
        }
        // console.log(err);
      }
    );
  }
};

// testThread();
const testAsync = async () => {
  const before = Date.now();
  for (let i = 0; i < 10000; i++) {
    // const res = await request({
    //   baseURL: "http://127.0.0.1:4003",
    //   url: "/api/posts",
    // });
    console.log(Date.now() - before);
    // console.log(res);
  }
  // console.log(Date.now() - before);
};

// testAsync()