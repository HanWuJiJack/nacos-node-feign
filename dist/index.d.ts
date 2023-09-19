export interface InstanceFeignType {
    serverList: string;
    namespace?: string;
    groupName?: string;
    serviceName: string;
    username?: string;
    password?: string;
}
export interface InstanceServerType {
    url: string;
    params?: any;
    data?: any;
    method?: string;
    timeout?: number;
}
export interface InstanceCloseMircoServerType {
    ip: string;
    port: number;
}
export interface interfaceAsyncGetFeign {
    (p: InstanceFeignType): any;
}
export declare const asyncGetFeign: interfaceAsyncGetFeign;
