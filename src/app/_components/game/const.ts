type Prettify<T> = { [K in keyof T]: T[K] };

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type NumberRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export const ROOM_MAP = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 4, 5, 8, 8, 8, 0, 6, 9],
  [9, 8, 8, 8, 8, 8, 8, 8, 9],
  [9, 8, 8, 8, 1, 8, 8, 2, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9],
] as const;

export type Row = Prettify<NumberRange<0, (typeof ROOM_MAP)["length"]>>;
export type Col = Prettify<NumberRange<0, (typeof ROOM_MAP)[number]["length"]>>;

export type Position = {
  row: Row;
  col: Col;
};

export const initialPosition = { row: 1, col: 6 } as const satisfies Position;

export const Direction = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
] as const;

export type Direction = (typeof Direction)[number];
