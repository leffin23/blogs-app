import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === 'production') {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    return prisma;
  }

  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};