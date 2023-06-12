const request = require("request");
const _ = require("underscore");

function post({ url, data, isJson = true, baseURL, timeout }) {
  const options = {
    url,
    baseUrl: baseURL,
    method: "POST",
    timeout,
  };
  if (isJson) _.extend(options, { json: true, body: JSON.stringify(data) });
  else _.extend(options, { form: data });
  
  return new Promise((resolve, reject) => {
    request(options, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode == 200) resolve(data);
    });
  });
}
function remove({ url, data, isJson = true, baseURL, timeout }) {
  const options = {
    url,
    baseUrl: baseURL,
    method: "DELETE",
    timeout,
  };
  if (isJson) _.extend(options, { json: true, body: JSON.stringify(data) });
  else _.extend(options, { form: data });
  return new Promise((resolve, reject) => {
    request(options, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode == 200) resolve(data);
    });
  });
}
function put({ url, data, isJson = true, baseURL, timeout }) {
  const options = {
    url,
    baseUrl: baseURL,
    method: "PUT",
    timeout,
  };
  if (isJson) _.extend(options, { json: true, body: JSON.stringify(data) });
  else _.extend(options, { form: data });
  return new Promise((resolve, reject) => {
    request(options, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode == 200) resolve(data);
    });
  });
}

function get({ url, params = {}, baseURL, timeout }) {
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        method: "GET",
        qs: params,
        baseUrl: baseURL,
        timeout,
      },
      (err, res, body) => {
        if (err) return reject(err);
        else if (res.statusCode == 200) resolve(body);
      }
    );
  });
}

module.exports = {
  post,
  get,
  remove,
  put,
};
