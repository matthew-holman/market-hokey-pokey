import { Test, TestingModule } from '@nestjs/testing';
import { CandlesController } from '@/candles/candles.controller';
import { CandlesService } from '@/candles/candles.service';
import { PrismaService } from 'prisma/prisma.service';

describe('CandlesController', () => {
  let controller: CandlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandlesController],
      providers: [CandlesService, PrismaService],
    }).compile();

    controller = module.get<CandlesController>(CandlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
