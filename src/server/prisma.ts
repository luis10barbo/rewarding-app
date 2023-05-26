import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const db =
  globalPrisma.prisma ??
  new PrismaClient({
    ...(process.env.NODE_ENV === "development" && {
      log: ["query", "info", "warn", "error"],
    }),
  });

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = db;

export default db;
