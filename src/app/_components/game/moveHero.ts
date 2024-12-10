import { TILES } from "@/app/constants";

type Position = {
  col: number;
  row: number;
};

type DirectionMap = {
  ArrowDown: "ArrowDown";
  ArrowLeft: "ArrowLeft";
  ArrowRight: "ArrowRight";
  ArrowUp: "ArrowUp";
};

type Direction = DirectionMap[keyof DirectionMap];

function canMoveToTile(tile: number | undefined): boolean {
  if (tile === undefined) return false;
  return tile === TILES.HERO || tile === TILES.FLOOR;
}

export function moveHero(
  direction: Direction,
  prevPosition: Position,
  roomMap: number[][],
): Position {
  const { row, col } = prevPosition;

  let targetRow = row;
  let targetCol = col;

  switch (direction) {
    case "ArrowUp":
      targetRow = row - 1;
      break;
    case "ArrowDown":
      targetRow = row + 1;
      break;
    case "ArrowLeft":
      targetCol = col - 1;
      break;
    case "ArrowRight":
      targetCol = col + 1;
      break;
  }

  const targetTile = roomMap[targetRow]?.[targetCol];
  if (canMoveToTile(targetTile)) {
    return { row: targetRow, col: targetCol };
  } else {
    return prevPosition;
  }
}
