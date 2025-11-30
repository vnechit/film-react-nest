import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmsRepository } from './films.repository';
import { Film, FilmDocument, IFilm, ISchedule } from './types';

export const FILMSTOKEN = Symbol('FILMSTOKEN');

@Injectable()
export class MongoDBService extends FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {
    super();
  }

  async findAll(): Promise<IFilm[]> {
    return await this.filmModel.find().lean().exec();
  }

  async findOne(id: string): Promise<IFilm | null> {
    return await this.filmModel.findOne({ id }).lean().exec();
  }

  async findFilmSchedule(id: string): Promise<ISchedule[]> {
    const film = await this.filmModel.findOne({ id }).lean().exec();
    return film.schedule ?? [];
  }

  async postNewOrder(
    filmId: string,
    scheduleId: string,
    seat: string,
  ): Promise<boolean> {
    const res = await this.filmModel.updateOne(
      { id: filmId, 'schedule.id': scheduleId },
      { $addToSet: { 'schedule.$[s].taken': seat } },
      { arrayFilters: [{ 's.id': scheduleId }] },
    );
    return res.modifiedCount > 0;
  }
}
