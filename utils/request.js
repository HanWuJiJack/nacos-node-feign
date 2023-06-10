const axios = require("axios");

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.message.includes("timeout")) {
      // 判断请求异常信息中是否含有超时timeout字符串
      // console.log("错误回调", error);
      return Promise.reject("timeout");
      // alert("网络超时");
    }
    if (error.message.includes("ECONNREFUSED")) {
      // 判断请求异常信息中是否含有超时timeout字符串
      // console.log("ECONNREFUSED88888");
      return Promise.reject("ECONNREFUSED");
      // alert("网络超时");
    }
    return Promise.reject(error);
  }
);

module.exports = ({
  baseURL,
  url,
  method = "get",
  params = {},
  data = {},
  timeout = 5000,
}) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        url,
        method, // 默认值
        params,
        data,
        timeout,
      })
      .then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
  });
};

// axios.require({
//     baseURL: 'https://some-domain.com/api/',
//     // `url` 是用于请求的服务器 URL
//     url: '/user',

//     // `method` 是创建请求时使用的方法
//     // post
//     // delete
//     // post
//     // put
//     // patch
//     method: 'get', // 默认值
//     // `params` 是与请求一起发送的 URL 参数
//     // 必须是一个简单对象或 URLSearchParams 对象
//     params: {
//         ID: 12345
//     },
//     // `data` 是作为请求体被发送的数据
//     // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
//     // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
//     // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
//     // - 浏览器专属: FormData, File, Blob
//     // - Node 专属: Stream, Buffer
//     data: {
//         firstName: 'Fred'
//     },
//     timeout: 1000
// })
