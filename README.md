# Nacos-Node-Feign 中间件

[![npm version](https://img.shields.io/npm/v/nacos-node-feign)](https://www.npmjs.com/package/nacos-node-feign)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/HanWuJiJack/nacos-node-feign)

**企业级微服务智能代理中间件**，深度整合Nacos服务发现与Redis元数据管理，提供：
- 🚩 动态服务路由与智能负载均衡
- ⚡ 双维度权重调度算法（实例权重+实时负载）
- 🔥 多环境服务治理能力（开发/测试/生产）
- 📈 服务状态可视化与自动容灾机制

**典型应用场景**：
- 基于权重的灰度发布流程
- 跨命名空间服务调用
- 分布式系统弹性扩展
- 微服务架构流量治理

## 功能特性

- 🚀 **动态服务发现** - 深度集成Nacos注册中心
- ⚖️ **智能负载均衡** - 权重+服务次数的双维度调度
- 🔄 **定时同步机制** - 独立线程池维护服务列表（默认20分钟/次）
- 📦 **Redis集成** - 服务元数据持久化支持

## 应用场景

- 微服务架构的动态路由
- 基于权重的灰度发布
- 多环境服务调度
- 服务实例的自动容灾切换

## 快速开始

### 安装

```bash
npm install nacos-node-feign
```

### 基础用法

**TypeScript:**
```typescript
import { asyncGetFeign } from 'nacos-node-feign';

interface MicroserviceConfig {
  serverList: string;
  serviceName: string;
  namespace?: string;
  // ...其他配置项
}

const initService = async () => {
  const service = await asyncGetFeign({
    serverList: 'http://127.0.0.1:8848',
    serviceName: 'ORDER_SERVICE',
    namespace: 'PRODUCTION',
    rhost: 'redis.prod.com'
  });

  // 服务调用示例
  const response = await service.run({
    url: '/api/orders',
    method: 'POST',
    data: { items: [1, 2, 3] },
    timeout: 8000
  });
};
```

**JavaScript:**
```javascript
const { asyncGetFeign } = require('nacos-node-feign');

async function bootstrap() {
  const inventoryService = await asyncGetFeign({
    serverList: 'http://nacos-cluster:8848',
    serviceName: 'INVENTORY_SERVICE',
    groupName: 'INVENTORY_GROUP',
    rport: 6379
  });

  // 查询库存接口
  const stock = await inventoryService.run({
    url: '/stock/check',
    params: { sku: 'ABC123' }
  });
}
```

## 配置参数

### Nacos 配置

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|-----|-------|-----|
| serverList | string | 是 | - | Nacos服务器地址，多个用逗号分隔 |
| serviceName | string | 是 | - | 注册的服务名称 |
| namespace | string | 否 | public | 命名空间ID |
| groupName | string | 否 | DEFAULT_GROUP | 服务分组名称 |
| username | string | 否 | - | Nacos认证用户名 |
| password | string | 否 | - | Nacos认证密码 |

### Redis 配置

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|-----|-------|-----|
| rhost | string | 是 | - | Redis服务器地址 |
| rport | number | 是 | 6379 | Redis端口 |
| rusername | string | 否 | - | Redis认证用户名 |
| rpassword | string | 否 | - | Redis认证密码 |
| rdb | number | 否 | 0 | Redis数据库索引 |

## 进阶配置

### 服务调用参数
```typescript
interface ServiceCallOptions {
  url: string;       // 请求路径
  method?: string;   // HTTP方法（GET/POST等）
  params?: object;   // URL查询参数
  data?: object;     // 请求体数据
  timeout?: number;  // 超时时间（毫秒）
  headers?: object;  // 自定义请求头
}
```

### 性能调优
```javascript
// 配置线程池参数
await asyncGetFeign({
  // ...其他配置
  threadPool: {
    coreSize: 10,     // 核心线程数
    maxSize: 50,      // 最大线程数
    keepAliveTime: 60 // 线程保持存活时间（秒）
  }
});
```

## 工作原理

![架构示意图](https://via.placeholder.com/800x400.png?text=Architecture+Diagram)

1. **服务注册** - 定时从Nacos获取服务实例列表
2. **权重计算** - 根据实例权重和当前负载进行动态分配
3. **请求代理** - 基于选择策略转发HTTP请求
4. **状态同步** - 通过Redis持久化服务元数据

## 开发指南

### 本地调试
```bash
# 启动Nacos本地实例
docker run --name nacos-quick -e MODE=standalone -p 8848:8848 nacos/nacos-server

# 运行测试用例
npm test

# 监控调试模式
NODE_DEBUG=feign npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 参与贡献

欢迎提交Pull Request，请确保：
1. 遵循现有代码风格
2. 包含完整的单元测试
3. 更新相关文档

## 许可证

[MIT License](LICENSE)

## 调度算法

采用动态权重负载均衡算法，计算公式：

```math
有效权重 = 实例权重 × (1 - 当前负载率)
```

**决策流程**：
1. 排除不健康实例
2. 计算各实例有效权重
3. 选择最高有效权重的实例
4. 记录服务调用次数
5. 定时同步调用统计数据

## 最佳实践

### 灰度发布场景
```typescript
// 配置不同权重实现灰度
await asyncGetFeign({
  serviceName: 'PAYMENT_SERVICE',
  weights: {
    'v1.0.0': 20,  // 20%流量
    'v2.0.0': 80   // 80%流量
  }
});
```

### 多环境管理
```javascript
// 通过namespace区分环境
const config = {
  serverList: 'http://nacos:8848',
  serviceName: 'USER_SERVICE',
  namespace: process.env.ENV // DEV/TEST/PROD
};
```


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




