import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TickersService } from './tickers.service';
import YahooMarketDataService from '@/market-data/yahoo-market-data/yahoo-market-data.service';

@Controller('tickers')
export class TickersController {
  constructor(
    private readonly tickers: TickersService,
    private readonly marketData: YahooMarketDataService,
  ) {}

  @Get()
  getAll() {
    return this.tickers.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tickers.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: { symbol: string }) {
    const symbol = body.symbol.toUpperCase();

    const existing = await this.tickers.findBySymbol(symbol);
    if (existing) return existing;

    const validated = await this.marketData
      .fetchTicker(symbol)
      .catch(() => null);

    if (!validated) {
      throw new HttpException(
        `Ticker '${symbol}' not found or not supported by Yahoo Finance`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.tickers.create(
      validated.symbol,
      validated.name,
      validated.currency ?? 'USD',
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tickers.delete(Number(id));
  }
}
