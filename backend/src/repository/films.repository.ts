import { IFilm, ISchedule } from './types';

export abstract class FilmsRepository {
  abstract findAll(): Promise<IFilm[]>;
  abstract findOne(id: string): Promise<IFilm | null>;
  abstract findFilmSchedule(id: string): Promise<ISchedule[]>;
  abstract postNewOrder(
    filmId: string,
    scheduleId: string,
    seat: string,
  ): Promise<boolean>;
  static FILMSTOKEN = Symbol('FILMSTOKEN');
}
