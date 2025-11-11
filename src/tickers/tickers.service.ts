import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Ticker } from '@prisma/client';

@Injectable()
export class TickersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Ticker[]> {
    return this.prisma.ticker.findMany();
  }

  async findOne(id: number): Promise<Ticker | null> {
    return this.prisma.ticker.findUnique({ where: { id } });
  }

  async create(symbol: string, name: string, currency?: string) {
    return this.prisma.ticker.create({
      data: { symbol, name, currency },
    });
  }

  async delete(id: number) {
    return this.prisma.ticker.delete({ where: { id } });
  }
}
