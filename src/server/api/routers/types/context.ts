import type { PrismaClient } from "@prisma/client";

export type Context = {
  db: PrismaClient;
};
