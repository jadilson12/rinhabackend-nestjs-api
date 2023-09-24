import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoggerMiddleware } from "./logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pessoa } from "./entities/pessoas";

const { DB_URL } = process.env

@Module({
  imports: [
     TypeOrmModule.forRoot({
       type: 'postgres',
       url: DB_URL || "postgres://postgres:12345678@localhost:5432/postgres",
      schema: "public",
      entities: ['../**/entities/*.js'],
      synchronize: false,
     }),
    TypeOrmModule.forFeature([Pessoa])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AppController);
  }
}
