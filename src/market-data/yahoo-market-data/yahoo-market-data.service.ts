import { Injectable } from '@nestjs/common';
import { Interval, Prisma } from '@prisma/client';
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

  async fetchCandles(
    symbol: string,
    interval: Interval,
    yearsOfHistory: number = 2,
  ): Promise<Prisma.CandleUncheckedCreateInput[]> {
    const yfInterval = interval === 'DAILY' ? '1d' : '1wk';

    try {
      const chart = await this.yf.chart(symbol, {
        period1: YahooMarketDataService.subtractYears(
          new Date(),
          yearsOfHistory,
        ),
        period2: new Date(),
        interval: yfInterval,
      });

      const quotes = chart.quotes ?? [];

      // Filter out incomplete data (no close)
      const validQuotes = quotes.filter(
        (q): q is typeof q & { close: number } =>
          q.close !== null && q.close !== undefined,
      );

      return validQuotes.map((q) => ({
        tickerId: 0, // injected later by caller
        interval,
        date: q.date,
        open: q.open ?? undefined,
        high: q.high ?? undefined,
        low: q.low ?? undefined,
        close: q.close,
        volume: q.volume ?? undefined,
      }));
    } catch (error) {
      console.error(
        `Failed to fetch candles for ${symbol}:`,
        (error as Error).message,
      );
      return [];
    }
  }

  private static subtractYears(date: Date = new Date(), years: number = 2) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }
}
export default YahooMarketDataService;
