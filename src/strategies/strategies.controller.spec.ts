import { Test, TestingModule } from '@nestjs/testing';
import { StrategiesController } from '@/strategies/strategies.controller';
import { PrismaService } from 'prisma/prisma.service';
import { StrategiesService } from '@/strategies/strategies.service';

describe('StrategiesController', () => {
  let controller: StrategiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrategiesController],
      providers: [StrategiesService, PrismaService],
    }).compile();

    controller = module.get<StrategiesController>(StrategiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
