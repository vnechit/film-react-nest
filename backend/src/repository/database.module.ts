import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmsRepository } from './films.repository';
import { MongoDBService } from './mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './types';
import { PostgresDBService } from './postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from './entities';

@Global()
@Module({})
export class DatabaseModule {
  static forRootAsync(): DynamicModule {
    const driver = process.env.DATABASE_DRIVER || 'postgres';

    const dynamicImports: any[] = [ConfigModule];
    const dynamicProviders: any[] = [];

    switch (driver) {
      case 'mongo':
        dynamicImports.push(
          MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              uri: config.get('DATABASE_URL_MONGODB'),
            }),
          }),
        );

        dynamicProviders.push({
          provide: FilmsRepository.FILMSTOKEN,
          useClass: MongoDBService,
        });
        break;
      case 'postgres':
        dynamicImports.push(
          TypeOrmModule.forFeature([Entities.Films, Entities.Schedules]),
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get('DATABASE_URL_POSRGRES'),
              port: Number(config.get('DATABASE_PORT')),
              username: config.get('DATABASE_USERNAME'),
              password: config.get('DATABASE_PASSWORD'),
              database: config.get('DATABASE_NAME'),
              entities: [Entities.Films, Entities.Schedules],
              synchronize: false,
            }),
          }),
        );

        dynamicProviders.push({
          provide: FilmsRepository.FILMSTOKEN,
          useClass: PostgresDBService,
        });
      default:
        break;
    }

    return {
      module: DatabaseModule,
      imports: dynamicImports,
      providers: dynamicProviders,
      exports: dynamicProviders,
    };
  }
}
