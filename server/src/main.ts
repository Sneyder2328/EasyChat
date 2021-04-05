import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import compression from 'compression';
import { HttpExceptionFilter } from "./utils/filters/HttpExceptionFilter";
import knex from "./database/knex";
import { Model } from 'objection';
Model.knex(knex);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //MIDDLEWARES
  //app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter())
  //SERVER
  await app.listen(3000);
}
bootstrap();
