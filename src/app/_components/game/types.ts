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

export type GameGrid = ReadonlyArray<ReadonlyArray<number>>;

export type Row<T extends GameGrid> = Prettify<NumberRange<0, T["length"]>> &
  number;
export type Col<T extends GameGrid> = Prettify<
  NumberRange<0, T[number]["length"]>
> &
  number;

export type Position<T extends GameGrid> = {
  row: Row<T>;
  col: Col<T>;
};

export const Direction = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
] as const;

export type Direction = (typeof Direction)[number];
