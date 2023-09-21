interface InstanceFeignType {
    serverList: string;
    namespace?: string;
    groupName?: string;
    serviceName: string;
    username?: string;
    password?: string;
    rhost?: string;
    rport?: number;
    rusername?: string;
    rpassword?: string;
    rdb?: number;
}
interface interfaceAsyncGetFeign {
    (p: InstanceFeignType): any;
}
export declare const asyncGetFeign: interfaceAsyncGetFeign;
export {};
