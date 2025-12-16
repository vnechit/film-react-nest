import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { IFilm, ISchedule } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from './entities/film.entity';
import { Schedules } from './entities/schedule.entity';
@Injectable()
export class PostgresDBService extends FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private readonly films: Repository<Films>,
    @InjectRepository(Schedules)
    private readonly schedules: Repository<Schedules>,
  ) {
    super();
  }

  async findAll(): Promise<IFilm[]> {
    return (await this.films.find()).map((item) => ({
      ...item,
      schedule: [],
    }));
  }

  async findOne(id: string): Promise<IFilm | null> {
    const film = await this.films.findOne({ where: { id } });
    if (!film) {
      return null;
    }
    const schedule = await this.schedules.find({ where: { filmId: id } });

    return {
      ...film,
      schedule: schedule.map((item) => ({
        ...item,
        taken: item.taken.split(',').filter(Boolean),
      })),
    };
  }

  async findFilmSchedule(id: string): Promise<ISchedule[]> {
    const schedule = await this.schedules.find({ where: { filmId: id } });
    return schedule.map((item) => ({
      ...item,
      taken: item.taken.split(',').filter(Boolean),
    }));
  }

  async postNewOrder(
    filmId: string,
    id: string,
    seat: string,
  ): Promise<boolean> {
    const schedule = await this.schedules.findOne({
      where: { id },
    });
    if (!schedule) throw NotFoundException;

    const taken = schedule.taken.split(',').filter(Boolean);

    if (taken.includes(seat)) throw BadRequestException;

    taken.push(seat);

    await this.schedules.update({ id }, { taken: taken.join(',') });
    return true;
  }
}
