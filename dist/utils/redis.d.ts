declare class redisC {
    client: any;
    constructor(host: string, port: number, username: string, password: string, db: number);
    set(key: string, value: object): Promise<void>;
    get(key: string): Promise<any>;
    quit(): void;
}
export declare const redisUtils: typeof redisC;
export {};
