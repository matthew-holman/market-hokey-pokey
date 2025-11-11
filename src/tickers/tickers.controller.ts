import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TickersService } from './tickers.service';

@Controller('tickers')
export class TickersController {
  constructor(private readonly tickers: TickersService) {}

  @Get()
  getAll() {
    return this.tickers.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tickers.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { symbol: string; name: string; currency?: string }) {
    return this.tickers.create(body.symbol, body.name, body.currency);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tickers.delete(Number(id));
  }
}
