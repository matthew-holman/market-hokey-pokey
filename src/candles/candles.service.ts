import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Interval, Prisma } from '@prisma/client';

@Injectable()
export class CandlesService {
  constructor(private prisma: PrismaService) {}

  async upsertCandles(
    candles: Prisma.CandleUncheckedCreateInput[],
  ): Promise<void> {
    for (const c of candles) {
      await this.prisma.candle.upsert({
        where: {
          tickerId_interval_date: {
            tickerId: c.tickerId,
            interval: c.interval,
            date: c.date,
          },
        },
        update: c,
        create: c,
      });
    }
  }

  async getCandles(tickerId: number, interval: Interval) {
    return this.prisma.candle.findMany({
      where: { tickerId, interval },
      orderBy: { date: 'asc' },
      include: { indicators: true },
    });
  }
}
