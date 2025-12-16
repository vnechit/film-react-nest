import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FilmsRepository.FILMSTOKEN)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async findAll() {
    return await this.filmsRepository.findAll();
  }

  async findOne(id) {
    return await this.filmsRepository.findOne(id);
  }

  async findFilmSchedule(id: string) {
    return await this.filmsRepository.findFilmSchedule(id);
  }
}
