export interface InstanceFeignType {
    serverList: string;
    namespace?: string;
    groupName?: string;
    serviceName: string;
    username?: string;
    password?: string;
}

export interface InstanceServerType {
    url: string,
    params?: any,
    data?: any,
    method?: string,
    timeout?: number
}

export interface InstanceCloseMircoServerType {
    ip: string;
    port: number
}

export class feign {
    private serverList;
    private namespaceId;
    private groupName;
    private MicroServerList: any[];
    private serviceName;
    // 总共接受请求数目
    private acceptRequireSum;
    // 权重和
    private weightSum;
    // 参数缓存
    private runData: any;
    private refreshTime;
    private threadsinitsum;
    private username;
    private password;
    private accessToken: string;
    constructor({ serverList, namespace, groupName, serviceName, username, password }: InstanceFeignType)  //构造函数
    getName(id: number): string

    // 负载均衡算法
    private LoadBalance(): any
    private async getToken(): void
    private async threadsinit(): void

    private async closeMircoServer({ ip, port }: InstanceCloseMircoServerType): any
    run({ url, params, data, method, timeout }: InstanceServerType): void
}
// export const asyncGetFeign: interfaceAsyncGetFeign
export function asyncGetFeign(p:InstanceFeignType):any