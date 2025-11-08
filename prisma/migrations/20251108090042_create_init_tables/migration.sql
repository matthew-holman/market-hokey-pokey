-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "IndicatorType" AS ENUM ('EMA', 'SMA');

-- CreateEnum
CREATE TYPE "StrategyType" AS ENUM ('EMA_CROSSOVER', 'SMA_CROSSOVER', 'MOMENTUM_250D');

-- CreateTable
CREATE TABLE "Ticker" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT,
    "lastUpdated" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candle" (
    "id" SERIAL NOT NULL,
    "tickerId" INTEGER NOT NULL,
    "interval" "Interval" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION,
    "high" DOUBLE PRECISION,
    "low" DOUBLE PRECISION,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indicator" (
    "id" SERIAL NOT NULL,
    "candleId" INTEGER NOT NULL,
    "type" "IndicatorType" NOT NULL,
    "period" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tickerId" INTEGER NOT NULL,
    "interval" "Interval" NOT NULL,
    "buyIndicator" TEXT NOT NULL,
    "sellIndicator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BacktestResult" (
    "id" SERIAL NOT NULL,
    "tickerId" INTEGER NOT NULL,
    "strategyId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalReturn" DOUBLE PRECISION NOT NULL,
    "maxDrawdown" DOUBLE PRECISION NOT NULL,
    "sharpeRatio" DOUBLE PRECISION,
    "tradesCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BacktestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_symbol_key" ON "Ticker"("symbol");

-- CreateIndex
CREATE INDEX "Candle_tickerId_interval_date_idx" ON "Candle"("tickerId", "interval", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Candle_tickerId_interval_date_key" ON "Candle"("tickerId", "interval", "date");

-- CreateIndex
CREATE INDEX "Indicator_type_period_idx" ON "Indicator"("type", "period");

-- CreateIndex
CREATE UNIQUE INDEX "Indicator_candleId_type_period_key" ON "Indicator"("candleId", "type", "period");

-- CreateIndex
CREATE INDEX "Strategy_tickerId_interval_idx" ON "Strategy"("tickerId", "interval");

-- CreateIndex
CREATE INDEX "BacktestResult_tickerId_strategyId_idx" ON "BacktestResult"("tickerId", "strategyId");

-- CreateIndex
CREATE UNIQUE INDEX "BacktestResult_tickerId_strategyId_startDate_endDate_key" ON "BacktestResult"("tickerId", "strategyId", "startDate", "endDate");

-- AddForeignKey
ALTER TABLE "Candle" ADD CONSTRAINT "Candle_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_candleId_fkey" FOREIGN KEY ("candleId") REFERENCES "Candle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BacktestResult" ADD CONSTRAINT "BacktestResult_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BacktestResult" ADD CONSTRAINT "BacktestResult_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
