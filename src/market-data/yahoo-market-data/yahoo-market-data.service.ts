import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import YahooFinance from 'yahoo-finance2';

@Injectable()
class YahooMarketDataService {
  private readonly yf = new YahooFinance();

  /**
   * Fetches ticker metadata from Yahoo Finance.
   * Returns a normalized Prisma.TickerCreateInput or null if not found.
   */
  async fetchTicker(
    rawSymbol: string,
  ): Promise<Prisma.TickerCreateInput | null> {
    const symbol = rawSymbol.trim().toUpperCase();

    const results = (await this.yf.search(symbol, {
      quotesCount: 5,
      newsCount: 0,
      enableFuzzyQuery: false,
    })) as {
      quotes?: Array<{
        symbol?: string;
        longname?: string;
        shortname?: string;
      }>;
    };

    const match = results.quotes?.find(
      (q) => q.symbol?.toUpperCase() === symbol,
    );

    if (!match) {
      // No exact symbol match — treat as not found
      return null;
    }

    try {
      const chart = await this.yf.chart(symbol, {
        period1: new Date(),
        interval: '1d',
      });

      const meta = chart?.meta;
      const name = match.longname ?? match.shortname ?? symbol;

      return {
        symbol,
        name,
        currency: (meta?.currency as string | undefined) ?? 'USD',
      };
    } catch {
      // If chart also fails (rare, but possible), fall back to just the search data.
      // You won’t get currency here; default to USD — you can backfill later.
      const name = match.longname ?? match.shortname ?? symbol;

      return {
        symbol,
        name,
        currency: 'USD',
      };
    }
  }
}
export default YahooMarketDataService;
