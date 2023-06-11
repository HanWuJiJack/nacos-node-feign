const proxymircoServer = require("./proxymircoServer");
const { asyncGetFeign } = require("../index");
const request = require("../utils/request");
const { resolve } = require("path");
const threadsPools = require("../threadsPools");
const TPools = new threadsPools(resolve(__dirname, "../seprateThread.js"));

// 实际转发代码
const proxy = async () => {
  const data = await proxymircoServer.ADONIS_NODE_.run({
    url: "/api/posts",
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
  console.log(before); // 1505722233092
  // 需要转发的代码
  for (let i = 0; i < 8; i++) {
    await proxy();
  }
  console.log(Date.now() - before); // 81736ms
};
init();

// -----------------------------------以下是测试多线程与单线程请求差距----------------------------------------
const testThread = () => {
  const before = Date.now();
  for (let i = 0; i < 10000; i++) {
    TPools.run(
      {
        baseURL: "http://127.0.0.1:4003",
        url: "/api/posts",
      },
      (err, res) => {
        console.log(Date.now() - before);
        // console.log(res);
      }
    );
  }
};

// testThread();
const testAsync = async () => {
  const before = Date.now();
  for (let i = 0; i < 10000; i++) {
    const res = await request({
      baseURL: "http://127.0.0.1:4003",
      url: "/api/posts",
    });
    console.log(Date.now() - before);
    // console.log(res);
  }
  // console.log(Date.now() - before);
};

// testAsync()
