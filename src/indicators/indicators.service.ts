import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IndicatorType } from '@prisma/client';

@Injectable()
export class IndicatorsService {
  constructor(private prisma: PrismaService) {}

  async upsertIndicator(
    candleId: number,
    type: IndicatorType,
    period: number,
    value: number,
  ) {
    return this.prisma.indicator.upsert({
      where: { candleId_type_period: { candleId, type, period } },
      update: { value },
      create: { candleId, type, period, value },
    });
  }

  async getIndicatorsForCandle(candleId: number) {
    return this.prisma.indicator.findMany({ where: { candleId } });
  }
}
