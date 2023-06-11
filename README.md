## 使用文档

### 安装包
```
npm i nacos-node-feign
```

### 将代理注册到中心
```
const init = async () => {
  //将转发注册到中心
  proxymircoServer.ADONIS_NODE_ = await asyncGetFeign({
    serverList: "http://127.0.0.1:8848",
    serviceName: "ADONIS_NODE_",
  });
};
init();
```

### 转发具体接口
```
const proxy = async () => {
  const data = await proxymircoServer.ADONIS_NODE_.run({
    url: "/api/posts",
  });
};
```

>run函数支持参数run({ url, params, data, method, timeout })  

>--url:具体路径  
>--params:query参数  
>--data:payload参数  
>--method:请求方法 默认为get方法  
>--timeout:超时时间 默认为5000毫秒  



