import { describe, it, expect } from "vitest";
import { moveHero } from "./moveHero";

describe("moveHero 関数のテスト", () => {
  const roomMap = [
    [9, 9, 9],
    [9, 0, 9],
    [9, 8, 9],
  ];

  it("上に移動できる場合", () => {
    const initialPosition = { row: 2, col: 1 };
    const newPosition = moveHero("ArrowUp", initialPosition, roomMap);
    expect(newPosition).toEqual({ row: 1, col: 1 });
  });

  it("下に移動できる場合", () => {
    const initialPosition = { row: 1, col: 1 };
    const newPosition = moveHero("ArrowDown", initialPosition, roomMap);
    expect(newPosition).toEqual({ row: 2, col: 1 });
  });

  it("左に移動できる場合", () => {
    const initialPosition = { row: 1, col: 2 };
    const newPosition = moveHero("ArrowLeft", initialPosition, roomMap);
    expect(newPosition).toEqual({ row: 1, col: 1 });
  });

  it("右に移動できる場合", () => {
    const initialPosition = { row: 1, col: 0 };
    const newPosition = moveHero("ArrowRight", initialPosition, roomMap);
    expect(newPosition).toEqual({ row: 1, col: 1 });
  });

  it("移動できない場合", () => {
    const initialPosition = { row: 1, col: 1 };
    const newPosition = moveHero("ArrowUp", initialPosition, roomMap);
    expect(newPosition).toEqual(initialPosition);
  });
});
