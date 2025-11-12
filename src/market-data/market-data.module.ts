import { Module } from '@nestjs/common';
import YahooMarketDataService from './yahoo-market-data/yahoo-market-data.service';

@Module({
  exports: [YahooMarketDataService],
  providers: [YahooMarketDataService],
})
export class MarketDataModule {}
