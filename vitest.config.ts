import { defineConfig } from "vitest/config";
import path from "path";
import dotenv from "dotenv";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // プロジェクト構造に合わせてパスを調整
    },
  },
});
