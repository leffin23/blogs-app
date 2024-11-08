import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
// let prisma: PrismaClient;

// export const getPrismaClient = (): PrismaClient => {
//   if (process.env.NODE_ENV === 'production') {
//     if (!prisma) {
//       prisma = new PrismaClient();
//     }
//     return prisma;
//   }

//   if (!prisma) {
//     prisma = new PrismaClient();
//   }

//   return prisma;
// };