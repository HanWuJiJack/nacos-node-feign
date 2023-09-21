import * as redis from 'redis';
class redisC {
    client: any;
    constructor(host: string, port: number, username: string, password: string, db: number) {
        (async () => {
            if (username && password) {
                this.client = await redis.createClient({
                    // `redis[s]://[[username][:password]@][host][:port][/db-number]`
                    url: `redis://${username}:${password}@${host}:${port}/${db}`
                })
                    .on('error', (err: any) => { console.log('Redis Client Error', err) })
                    .connect();
            } else {
                this.client = await redis.createClient({
                    url: `redis://${host}:${port}/${db}`
                })
                    .on('error', (err: any) => { console.log('Redis Client Error', err) })
                    .connect();
            }
            console.log("链接redis成功！")
        })()
    }
    async set(key: string, value: object) {
        await this.client.set(key, JSON.stringify(value));
    }
    async get(key: string) {
        const val = await this.client.get(key);
        return typeof val === "string" ? JSON.parse(val) : {}
    }
    quit() {
        this.client.disconnect();
    }
}

export const redisUtils = redisC