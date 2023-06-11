const proxymircoServer = require("./proxymircoServer");
const { asyncGetFeign } = require("../index");

// 实际转发代码
const proxy = async () => {
  const data = await proxymircoServer.ADONIS_NODE_.run({
    url: "/api/posts",
    // timeout: 5000,
  });
};

const init = async () => {
  //将转发注册到中心
  proxymircoServer.ADONIS_NODE_ = await asyncGetFeign({
    serverList: "http://127.0.0.1:8848",
    serviceName: "ADONIS_NODE_",
  });

  // 需要转发的代码
  for (let i = 0; i < 8; i++) {
    proxy();
  }
};
init();
