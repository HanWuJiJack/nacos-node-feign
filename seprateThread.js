const request = require("./utils/request");
const { parentPort } = require("worker_threads");

parentPort.on(
  "message",
  ({
    baseURL,
    url,
    method, // 默认值
    params,
    data,
    timeout,
  }) => {
    request({
      baseURL,
      url,
      method, // 默认值
      params,
      data,
      timeout,
    }).then(
      (res) => {
        // console.log("parentPortres=>", res);
        parentPort.postMessage(res);
      },
      (err) => {
        // console.log("parentPorterr=>", err);
        parentPort.postMessage(err);
      }
    );
  }
);
