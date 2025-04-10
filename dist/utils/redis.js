import * as redis from 'redis';
class redisC {
    client;
    constructor(host, port, username, password, db) {
        (async () => {
            if (username && password) {
                this.client = await redis.createClient({
                    // `redis[s]://[[username][:password]@][host][:port][/db-number]`
                    url: `redis://${username}:${password}@${host}:${port}/${db}`
                })
                    .on('error', (err) => { console.log('Redis Client Error', err); })
                    .connect();
            }
            else {
                this.client = await redis.createClient({
                    url: `redis://${host}:${port}/${db}`
                })
                    .on('error', (err) => { console.log('Redis Client Error', err); })
                    .connect();
            }
            console.log("链接redis成功！");
        })();
    }
    async set(key, value) {
        await this.client.set(key, JSON.stringify(value));
    }
    async get(key) {
        const val = await this.client.get(key);
        return typeof val === "string" ? JSON.parse(val) : {};
    }
    quit() {
        this.client.disconnect();
    }
}
export const redisUtils = redisC;
