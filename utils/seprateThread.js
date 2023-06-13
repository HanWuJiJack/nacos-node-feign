const request = require("./request");
const {
  parentPort
} = require("worker_threads");

parentPort.on(
  "message",
  ({
    baseURL,
    url,
    method, // 默认值
    params,
    data,
    timeout,
    headers = {}
  }) => {
    request({
      baseURL,
      url,
      method, // 默认值
      params,
      data,
      timeout,
      headers
    }).then(
      (res) => {
        parentPort.postMessage(res);
      },
      (err) => {
        // console.log("parentPorterr=>", err);
        parentPort.postMessage(err);
      }
    );
  }
);