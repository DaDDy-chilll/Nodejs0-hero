const { isMainThread, workerData, Worker } = require("worker_threads");

if (isMainThread) {
  console.log(`Main Thread! Proceess ID:  ${process.pid}`);
  new Worker(__filename, {
    workerData: [1, 3, 5, 7, 9],
  });
  new Worker(__filename, {
    workerData: [2, 4, 6, 8, 0],
  });
} else {
  console.log(`Woker! Proceess ID:  ${process.pid}`);
  console.log(`${workerData} sort is ${workerData.sort()}`);
}
