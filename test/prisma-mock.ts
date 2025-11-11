import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { PrismaService } from 'prisma/prisma.service';

const prismaMock = mockDeep<PrismaClient>();

jest.mock('../prisma/prisma.service', () => ({
  __esModule: true,
  PrismaService: jest.fn(() => prismaMock),
}));

// Reset all mocks before each test
beforeEach(() => {
  mockReset(prismaMock);
});

export { prismaMock };
export type PrismaMock = DeepMockProxy<PrismaClient>;