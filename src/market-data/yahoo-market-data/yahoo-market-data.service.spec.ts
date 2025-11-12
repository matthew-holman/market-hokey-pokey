import { Test, TestingModule } from '@nestjs/testing';
import YahooMarketDataService from './yahoo-market-data.service';
import { Interval } from '@prisma/client';

describe('YahooMarketDataService', () => {
  let service: YahooMarketDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YahooMarketDataService],
    }).compile();

    service = module.get<YahooMarketDataService>(YahooMarketDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('fetchTicker() should return data for SPY', async () => {
    const ticker = await service.fetchTicker('^GSPC');
    expect(ticker).not.toBeNull();
    expect(ticker?.symbol).toBe('^GSPC');
    expect(ticker?.name).toBe('S&P 500');
    expect(typeof ticker?.name).toBe('string');
    expect(ticker?.currency).toBeDefined();
  });

  it.skip('fetchTicker() should return null for an invalid symbol', async () => {
    const ticker = await service.fetchTicker('FAKE_TICKER_123');
    expect(ticker).toBeNull();
  });

  it.skip('should fetch recent candles for ^GSPC', async () => {
    const candles = await service.fetchCandles('^GSPC', Interval.WEEKLY, 2);

    expect(Array.isArray(candles)).toBe(true);
    expect(candles.length).toBe(106);

    const first = candles[0];
    expect(first).toHaveProperty('close');
    expect(first.close).not.toBeNull();
    expect(first.interval).toBe(Interval.WEEKLY);
  });
});
