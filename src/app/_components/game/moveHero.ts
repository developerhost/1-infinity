import { TILES } from "@/app/constants";
import {
  type Position,
  type Direction,
  ROOM_MAP,
  type Row,
  type Col,
} from "./const";

function canMoveToTile(tile: number): boolean {
  return tile === TILES.HERO || tile === TILES.FLOOR;
}

const decrementRow = (row: Row): Row => Math.max(row - 1, 0) as Row;
const incrementRow = (row: Row): Row =>
  Math.min(ROOM_MAP.length - 1, row + 1) as Row;
const decrementCol = (col: Col): Col => Math.max(col - 1, 0) as Col;
const incrementCol = (col: Col): Col =>
  Math.min(ROOM_MAP[0].length - 1, col + 1) as Col;

export function moveHero(
  direction: Direction,
  prevPosition: Position,
): Position {
  const { row, col } = prevPosition;

  const targetMap = {
    ArrowUp: { row: decrementRow(row), col },
    ArrowDown: { row: incrementRow(row), col },
    ArrowLeft: { row, col: decrementCol(col) },
    ArrowRight: { row, col: incrementCol(col) },
  } as const satisfies Record<Direction, Position>;

  const targetPosition: Position = targetMap[direction];
  const targetTile = ROOM_MAP[targetPosition.row][targetPosition.col];
  return canMoveToTile(targetTile) ? targetPosition : prevPosition;
}
