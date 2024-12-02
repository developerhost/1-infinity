import { describe, it, expect, vi } from "vitest";
import { getUserById } from "@/server/api/routers/user/getUserById";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

describe("getUserById 関数", () => {
  it("存在するユーザーIDを渡した場合、ユーザー情報を取得できること", async () => {
    // モックの Prisma クライアント
    const mockDb = {
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: "user123",
          name: "Test User",
          image: "test_image_url",
          introduction: "Hello, this is a test user.",
        }),
      },
    };

    const ctx = { db: mockDb as unknown as PrismaClient }; // 型キャストで PrismaClient 型に変換
    const input = { id: "user123" };

    const result = await getUserById({ ctx, input });

    expect(result).toEqual({
      id: "user123",
      name: "Test User",
      image: "test_image_url",
      introduction: "Hello, this is a test user.",
    });
  });

  it("存在しないユーザーIDを渡した場合、エラーが発生すること", async () => {
    // モックの Prisma クライアント
    const mockDb = {
      user: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    };

    const ctx = { db: mockDb as unknown as PrismaClient }; // 型キャストで PrismaClient 型に変換
    const input = { id: "non existent user" };

    await expect(getUserById({ ctx, input })).rejects.toThrow(TRPCError);
    await expect(getUserById({ ctx, input })).rejects.toThrow("User not found");
  });
});
