import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { LoggerMiddleware } from "./logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pessoa } from "./entities/pessoas";

const { DB_URL } = process.env

@Module({
  imports: [
    // MikroOrmModule.forRoot({
    //   entities: ["./dist/entities"],
    //   entitiesTs: ["./src/entities"],
    //   dbName: "postgres",
    //   schema: "public",
    //   clientUrl: DB_URL || "postgres://postgres:12345678@localhost:5432/postgres",
    //   type: "postgresql",
    //   pool: {
    //     max: (Number(process.env.DB_POOL) || 200),
    //   },
    //   // dbName: "pessoa",
    //   // type: "mongo",
    //   // clientUrl: DB_URL || "mongodb://root:12345678@localhost:27017",
    //   autoLoadEntities: true,
   
    // }),
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
