const { Worker } = require("worker_threads");
module.exports = class threadsLong {
  constructor(workerPath) {
    this.workerPath = workerPath;
    // 创建 Workers
    this.worker = new Worker(workerPath);
  }

  runWorker(taskObj) {
    // 设置两个回调，用于 Worker 的监听器
    const messageCallback = (result) => {
      // console.log("messageCallback", result);
      taskObj.cb(null, result);
    };
    const errorCallback = (error) => {
      taskObj.cb(error);
    };

    // 为 Worker 添加 'message' 和 'error' 两个 Listener
    this.worker.on("message", messageCallback);
    this.worker.on("error", errorCallback);
    // 将数据传给 Worker 供其获取和执行
    this.worker.postMessage(taskObj.data);
  }
  run(data, callBack) {
    const taskObj = {
      data,
      cb: callBack,
    };
    // 有一个空闲的 Worker，用它执行任务
    this.runWorker(taskObj);
  }
  destroy() {
    // 销毁这个 Worker
    this.worker.terminate();
  }
};
