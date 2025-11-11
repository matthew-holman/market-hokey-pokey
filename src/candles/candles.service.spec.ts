import { Test, TestingModule } from '@nestjs/testing';
import { CandlesService } from './candles.service';
import { PrismaService } from 'prisma/prisma.service';

describe('CandlesService', () => {
  let service: CandlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandlesService, PrismaService],
    }).compile();

    service = module.get<CandlesService>(CandlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
