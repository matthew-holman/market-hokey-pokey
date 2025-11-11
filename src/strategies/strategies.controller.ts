import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { StrategiesService } from './strategies.service';
import { Interval } from 'src/generated/prisma';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Strategies')
@Controller('strategies')
export class StrategiesController {
  constructor(private readonly strategies: StrategiesService) {}

  @Get()
  @ApiQuery({ name: 'tickerId', required: false, type: Number })
  async findAll(@Query('tickerId') tickerId?: number) {
    if (tickerId) {
      return this.strategies.findByTicker(Number(tickerId));
    }
    return this.strategies.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.strategies.findOne(Number(id));
  }

  @Post()
  async create(
    @Body()
    body: {
      tickerId: number;
      name: string;
      interval: Interval;
      buyIndicator: string;
      sellIndicator: string;
    },
  ) {
    return this.strategies.create(
      body.tickerId,
      body.name,
      body.interval,
      body.buyIndicator,
      body.sellIndicator,
    );
  }
}
