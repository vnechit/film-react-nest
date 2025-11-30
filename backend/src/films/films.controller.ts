import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ScheduleDTO, FilmDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('')
  async findAll(): Promise<{ items: Array<FilmDto> }> {
    const items = await this.filmsService.findAll();
    return { items };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FilmDto> {
    return await this.filmsService.findOne(id);
  }

  @Get(':id/schedule')
  async findOneSchedule(
    @Param('id') id: string,
  ): Promise<{ items: Array<ScheduleDTO> }> {
    const items = await this.filmsService.findFilmSchedule(id);
    return { items };
  }
}
