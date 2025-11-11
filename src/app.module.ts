import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TickersModule } from './tickers/tickers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CandlesModule } from './candles/candles.module';
import { StrategiesModule } from './strategies/strategies.module';
import { IndicatorsModule } from './indicators/indicators.module';

@Module({
  imports: [
    TickersModule,
    PrismaModule,
    CandlesModule,
    StrategiesModule,
    IndicatorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
