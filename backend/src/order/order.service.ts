import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { OrderItemResponseDto, OrderRequestDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FilmsRepository.FILMSTOKEN) private readonly films: FilmsRepository,
  ) {}

  async create(dto: OrderRequestDto): Promise<Array<OrderItemResponseDto>> {
    const response: OrderItemResponseDto[] = [];

    for (const ticket of dto.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;

      const film = await this.films.findOne(ticket.film);
      if (!film) {
        throw new NotFoundException(`Фильм ${ticket.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);

      if (session.taken?.includes(seat)) {
        throw new BadRequestException('Места уже забронированы');
      }

      const reserved = await this.films.postNewOrder(
        ticket.film,
        ticket.session,
        seat,
      );
      if (!reserved) {
        throw new BadRequestException('Места уже забронированы');
      }

      response.push({
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        status: 'created',
      });
    }

    return response;
  }
}
