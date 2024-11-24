import { describe, it, expect, vi } from "vitest";
import { userRouter } from "@/server/api/routers/user";

describe("ユーザー取得機能", () => {
  it("存在するユーザーIDを渡した場合、ユーザー情報を取得できること", async () => {
    // モックのコンテキストを作成
    const mockCtx = {
      db: {
        user: {
          findUnique: vi.fn().mockResolvedValue({
            id: "user123",
            name: "Test User",
            image: "test_image_url",
            introduction: "Hello, this is a test user.",
          }),
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    const caller = userRouter.createCaller(mockCtx as any);

    const input = { id: "user123" };

    const result = await caller.getUserById(input);

    expect(result).toEqual({
      id: "user123",
      name: "Test User",
      image: "test_image_url",
      introduction: "Hello, this is a test user.",
    });
  });

  it("存在しないユーザーIDを渡した場合、エラーが発生すること", async () => {
    // モックのコンテキストを作成
    const mockCtx = {
      db: {
        user: {
          findUnique: vi.fn().mockResolvedValue(null),
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    const caller = userRouter.createCaller(mockCtx as any);

    const input = { id: "nonexistentuser" };

    await expect(caller.getUserById(input)).rejects.toThrow("User not found");
  });
});
