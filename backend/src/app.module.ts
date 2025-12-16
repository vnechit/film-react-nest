import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { OrderModule } from './order/order.module';
import { FilmsModule } from './films/films.module';
import { DatabaseModule } from './repository/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha/',
    }),
    DatabaseModule.forRootAsync(),
    OrderModule,
    FilmsModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
