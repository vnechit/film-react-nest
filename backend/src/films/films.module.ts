import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Film, FilmSchema } from '../repository/types';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FILMSTOKEN, MongoDBService } from '../repository/mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FILMSTOKEN,
      useClass: MongoDBService,
    },
  ],
  exports: [FILMSTOKEN, FilmsService],
})
export class FilmsModule {}
