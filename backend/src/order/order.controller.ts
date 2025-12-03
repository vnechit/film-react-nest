import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRequestDto, OrderItemResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orders: OrderService) {}

  @Post()
  async create(
    @Body() dto: OrderRequestDto,
  ): Promise<{ items: Array<OrderItemResponseDto> }> {
    const items = await this.orders.create(dto);
    return { items };
  }
}
