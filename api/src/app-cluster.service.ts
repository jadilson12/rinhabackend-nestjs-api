// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster = require("node:cluster");

import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export default class AppClusterService {
  static clusterize(callback: () => void): void {
    const { CLUSTER_WORKERS } = process.env;
    if (cluster.isMaster) {
      Logger.log(
        `Master server started on ${process.pid}`,
        "AppClusterService"
      );
      for (let i = 0; i < Number(CLUSTER_WORKERS || 4); i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker: any) => {
        Logger.log(
          `Worker ${worker.process.pid} died... scheduling another one!`,
          "AppClusterService"
        );
        cluster.fork();
      });
    } else {
      callback();
    }
  }
}
