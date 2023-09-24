import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppClusterService } from "./app-cluster.service";
// import { AppClusterService } from "./app_cluster.service";
const { HTTP_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(HTTP_PORT) || 8080);
}
// bootstrap();
AppClusterService.clusterize(bootstrap);
