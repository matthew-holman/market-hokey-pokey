import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CandlesService } from './candles.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Interval, Prisma } from '@prisma/client';

@ApiTags('Candles')
@Controller('candles')
export class CandlesController {
  constructor(private readonly candles: CandlesService) {}

  @Get()
  @ApiQuery({ name: 'tickerId', required: true, type: Number })
  @ApiQuery({ name: 'interval', required: true, enum: Interval })
  async getCandles(
    @Query('tickerId') tickerId: number,
    @Query('interval') interval: Interval,
  ) {
    return this.candles.getCandles(Number(tickerId), interval);
  }

  @Post()
  async upsertCandles(
    @Body() body: Prisma.CandleUncheckedCreateInput[],
  ): Promise<{ status: string }> {
    await this.candles.upsertCandles(body);
    return { status: 'ok' };
  }

  @Get(':tickerId/:interval/latest')
  async getLatestCandle(
    @Param('tickerId') tickerId: string,
    @Param('interval') interval: Interval,
  ) {
    const candles = await this.candles.getCandles(Number(tickerId), interval);
    return candles.at(-1);
  }
}
