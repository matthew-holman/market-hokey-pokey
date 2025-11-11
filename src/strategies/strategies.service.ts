import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Strategy, Interval } from '@prisma/client';

@Injectable()
export class StrategiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Strategy[]> {
    return this.prisma.strategy.findMany();
  }

  async findOne(id: number): Promise<Strategy | null> {
    return this.prisma.strategy.findUnique({ where: { id } });
  }

  async findByTicker(tickerId: number): Promise<Strategy[]> {
    return this.prisma.strategy.findMany({ where: { tickerId } });
  }

  async create(
    tickerId: number,
    name: string,
    interval: Interval,
    buy: string,
    sell: string,
  ) {
    return this.prisma.strategy.create({
      data: {
        tickerId,
        name,
        interval,
        buyIndicator: buy,
        sellIndicator: sell,
      },
    });
  }
}
