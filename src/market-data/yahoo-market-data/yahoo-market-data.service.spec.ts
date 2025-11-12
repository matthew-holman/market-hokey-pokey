import { Test, TestingModule } from '@nestjs/testing';
import YahooMarketDataService from './yahoo-market-data.service';

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
});
