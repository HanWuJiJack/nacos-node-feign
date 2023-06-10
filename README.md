## 使用文档
```
npm i nacos-node-feign
```

```
const run = require("nacos-node-feign");

const getFeign = () => {
    let feign: any = null
    return async () => {
        if (!feign) {
            feign = await run({ serverList: "http://127.0.0.1:8848", serviceName: "ADONIS_NODE_" })
        }
        return feign
    }
}
const Feign = getFeign()
export async function proxy_() {
    const feign: any = await Feign();
    // feign.request({ url:"", params, data, method, timeout})
    const Fdata = await feign.request({ url: "/api/posts" })
    return Fdata
}
```