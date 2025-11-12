import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickersController } from './tickers.controller';
import YahooMarketDataService from '@/market-data/yahoo-market-data/yahoo-market-data.service';

@Module({
  controllers: [TickersController],
  providers: [TickersService, YahooMarketDataService],
  exports: [TickersService],
})
export class TickersModule {}
