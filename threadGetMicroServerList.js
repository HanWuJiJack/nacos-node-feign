const request = require("./utils/request");
const { parentPort } = require("worker_threads");

const toRequire = ({
  baseURL,
  url,
  method, // 默认值
  params,
  data,
  timeout,
  refreshTime,
}) => {
  request({
    baseURL,
    url,
    method, // 默认值
    params,
    data,
    timeout,
    refreshTime,
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
  setTimeout(() => {
    toRequire({
      baseURL,
      url,
      method, // 默认值
      params,
      data,
      timeout,
      refreshTime,
    });
  }, refreshTime);
};

parentPort.on(
  "message",
  ({
    baseURL,
    url,
    method, // 默认值
    params,
    data,
    timeout,
    refreshTime,
  }) => {
    toRequire({
      baseURL,
      url,
      method, // 默认值
      params,
      data,
      timeout,
      refreshTime,
    });
  }
);
