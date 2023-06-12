const { post, get, remove, put } = require("./request1");
const { parentPort } = require("worker_threads");

parentPort.on(
  "message",
  ({
    baseURL,
    url,
    method = "get", // 默认值
    params,
    data,
    timeout,
    sum,
  }) => {
    // console.log("sum", sum);
    for (let i = 0; i < sum; i++) {
      if (method.toLocaleLowerCase() === "get") {
        get({
          baseURL,
          url,
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
    }
  }
);
