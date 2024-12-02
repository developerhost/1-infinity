import { type PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";

export type Context = {
  session: Session | null;
  headers: Headers;
  db: PrismaClient<
    {
      log: ("warn" | "error")[];
    },
    never
  >;
};
