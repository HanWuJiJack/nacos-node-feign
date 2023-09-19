import { asyncGetFeign } from "../dist/index";

const proxymircoServer: {
  ADONIS_NODE_: any
} = {
  ADONIS_NODE_: ""
}

// // 实际转发代码
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
    username: "nacos",
    password: "hsueh"
  });
  const before = Date.now();
  console.log(before); // 1505722233092
  // 需要转发的代码
  setTimeout(() => {
    proxy();
  }, 1000);
  console.log(Date.now() - before); // 81736ms
};
init();