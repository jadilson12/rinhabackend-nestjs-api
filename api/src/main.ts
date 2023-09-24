import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./http-exception.filter";
import AppClusterService from "./app-cluster.service";
import { Logger } from "@nestjs/common";

const { HTTP_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(Number(HTTP_PORT) || 8080);

  // aguardar as conexoes serem encerradas para só então encerrar o programa
  process.on("SIGTERM", async () => {
    Logger.log("server ending", new Date().toISOString());
    await app.close();
  });
}
// bootstrap();
AppClusterService.clusterize(bootstrap);
