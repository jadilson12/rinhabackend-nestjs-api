// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster = require("node:cluster");

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < 4; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
