import { useState } from "react";

import { useKey } from "react-use";
import { moveHero } from "./moveHero";

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

export function useHeroMovement(
  initialPosition: Position,
  roomMap: number[][],
) {
  const [heroPosition, setHeroPosition] = useState(initialPosition);

  const handleMoveHero = (direction: Direction) => {
    setHeroPosition((prevPosition) =>
      moveHero(direction, prevPosition, roomMap),
    );
  };

  // キーボード入力を監視してキャラクターを移動させる
  useKey("ArrowUp", () => handleMoveHero("ArrowUp"));
  useKey("ArrowDown", () => handleMoveHero("ArrowDown"));
  useKey("ArrowLeft", () => handleMoveHero("ArrowLeft"));
  useKey("ArrowRight", () => handleMoveHero("ArrowRight"));

  return { heroPosition, moveHero: handleMoveHero };
}
