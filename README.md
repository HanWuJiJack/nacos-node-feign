## 使用文档
>如果你感觉本包对你起到一点点作用，请帮忙点个star Thanks♪(･ω･)ﾉ  

### 安装包
>```
>npm i nacos-node-feign
>```

### 引入包-ts
>```
>import asyncGetFeignDefault from "nacos-node-feign";
>const { asyncGetFeign } = asyncGetFeignDefault
>```

### 引入包-js
>```
>const asyncGetFeignDefault = require("nacos-node-feign");
>const { asyncGetFeign } = asyncGetFeignDefault.default
>```

### 将代理注册到中心
>```
>const init = async () => {
>  //将转发注册到中心
>  proxymircoServer.ADONIS_NODE_ = await asyncGetFeign({
>    serverList: "http://127.0.0.1:8848",
>    serviceName: "ADONIS_NODE_",
>  });
>};
>init();
>```

### 转发具体接口
>```
>const proxy = async () => {
>  const data = await proxymircoServer.ADONIS_NODE_.run({
>    url: "/api/posts",
>  });
>};
>```

### 参数说明
#### proxymircoServer.ADONIS_NODE_.run函数支持参数({ url, params, data, method, timeout })  
>url:具体路径  
>params:query参数  
>data:payload参数  
>method:请求方法 默认为get方法  
>timeout:超时时间 默认为5000毫秒  

#### asyncGetFeign函数支持参数({ serverList, namespace, groupName, serviceName,username,password})
>serverList:nacos服务地址 - 为必填  
>namespace:空间名称（网页路径：服务管理/服务列表） - 不为必填  
>groupName:分组名称（网页路径：服务管理/服务列表） - 不为必填  
>serviceName:服务名（网页路径：服务管理/服务列表）- 为必填  
>username: nacos用户名 - 取决你是否在nacos配置权限认证  
>password: nacos密码 - 取决你是否在nacos配置权限认证  



### 核心实现逻辑
>本包核心是通过计算微服务权重去动态选择服务进而转发服务~  

### 包关联信息
>[npm链接](https://www.npmjs.com/package/nacos-node-feign)  
>[github链接](https://github.com/HanWuJiJack/nacos-node-feign)  




