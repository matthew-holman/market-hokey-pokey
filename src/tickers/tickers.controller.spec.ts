import { Test, TestingModule } from '@nestjs/testing';
import { TickersController } from '@/tickers/tickers.controller';
import { PrismaService } from 'prisma/prisma.service';
import { TickersService } from '@/tickers/tickers.service';

describe('TickersController', () => {
  let controller: TickersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TickersController],
      providers: [TickersService, PrismaService],
    }).compile();

    controller = module.get<TickersController>(TickersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
