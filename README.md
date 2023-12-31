## 使用文档

### 核心思想
>1、核心功能：通过从nacos拿到微服务注册信息，通过权重比例进行接口代理分发。 
>2、通过多线程，每20分钟从nacos获取一次微服务列表信息  
>3、建议先将服务注册到nacos，再调用本包的asyncGetFeign方法  
>4、算法：通过当前微服务权重比例和当前微服务已经服务次数，算出当前微服务对应全部服务次数。取微服务对应全部服务次数最小的微服务进行代理！  
>如果你感觉本包对你起到一点点作用，请帮忙点个star Thanks♪(･ω･)ﾉ  


### 安装包
>```
>npm i nacos-node-feign
>```

### 引入包-ts
>```
>import { asyncGetFeign } from "nacos-node-feign";
>```

### 引入包-js
>```
>const { asyncGetFeign } = require("nacos-node-feign");
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

#### asyncGetFeign函数支持参数({ serverList, namespace, groupName, serviceName,username,password,rhost,rport,rusername,rpassword,rdb})
>serverList:nacos服务地址 - 为必填  
>namespace:空间名称（网页路径：服务管理/服务列表） - 不为必填  
>groupName:分组名称（网页路径：服务管理/服务列表） - 不为必填  
>serviceName:服务名（网页路径：服务管理/服务列表）- 为必填  
>username: nacos用户名 - 取决你是否在nacos配置权限认证  
>password: nacos密码 - 取决你是否在nacos配置权限认证  

> ##### redis配置参数

>rhost:redis-host - 为必填  
>rport:redis-port - 为必填  
>rusername:redis-username - 不为必填  
>rpassword:redis-password - 不为必填 
>rdb: redis-db - 不为必填 


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

### 核心实现逻辑
>本包核心是通过计算微服务权重去动态选择服务进而转发服务~  

### 包关联信息
>[npm链接](https://www.npmjs.com/package/nacos-node-feign)  
>[github链接](https://github.com/HanWuJiJack/nacos-node-feign)  




