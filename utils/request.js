const request = require("request");
const _ = require("underscore");
// 参考
// https://www.microanswer.cn/blog/64
module.exports = ({
  isJson = true,
  baseURL,
  url,
  method = "get",
  params = {},
  data = {},
  headers = {},
  timeout
}) => {
  const options = {
    url,
    baseUrl: baseURL,
    method: method.toLocaleUpperCase(),
    timeout,
    headers,
    qs: params
  };
  if (options.method !== "GET") {
    if (isJson) {
      _.extend(options, {
        json: true,
        body: data
      });
    } else {
      _.extend(options, {
        form: data
      });
    }
  } else {
    _.extend(options, {
      json: true
    });
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, data) => {
      if (err) {
        if (err.message.includes("timeout")) {
          // 判断请求异常信息中是否含有超时timeout字符串
          // console.log("错误回调", err);
          return reject({
            code: 50001,
            message: "请求超时",
          });
          // alert("网络超时");
        }
        if (err.message.includes("ECONNREFUSED")) {
          // 判断请求异常信息中是否含有超时timeout字符串
          // console.log("ECONNREFUSED88888");
          return reject({
            code: 50002,
            message: "拒绝连接",
          });
          // alert("网络超时");
        }
        return reject({
          code: 50003,
          message: err.message,
        });
      }
      resolve(data);
    });
  });
}