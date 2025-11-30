import { Inject, Injectable } from '@nestjs/common';
import { FILMSTOKEN, MongoDBService } from '../repository/mongo.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMSTOKEN) private readonly filmsRepository: MongoDBService,
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
