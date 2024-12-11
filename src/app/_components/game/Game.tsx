"use client";

import { useState } from "react";
import ChoicesButtonGroup from "./ChoicesButtonGroup";
import RecordDisplay from "./RecordDisplay";
import GameController from "./controller/GameController";
import { useHeroMovement } from "./useHeroMovement";
import { useLocalStorage } from "react-use";
import { initialPosition, ROOM_MAP } from "./const";
import { TileList } from "./map/TileList";

const Game = () => {
  const [record, setRecord] = useState<number>(1); // 1 -> 1/2, 2 -> 1/4, etc.
  const [bestRecord = 0, setBestRecord] = useLocalStorage<number>(
    "bestRecord",
    1,
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // TODO: 勇者の移動処理を追加
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { heroPosition, moveHero } = useHeroMovement(ROOM_MAP, initialPosition);

  const handleButtonClick = () => {
    const correct = Math.random() < 0.5; // 1/2の確率で正解
    setIsCorrect(correct);

    if (correct) {
      const newRecord = record + 1;
      setRecord(newRecord);
      // ベスト記録更新時に更新
      if (newRecord > bestRecord) {
        setBestRecord(newRecord);
      }
    } else {
      setRecord(1); // 不正解時にリセット
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TileList heroPosition={heroPosition} map={ROOM_MAP} />
      <GameController
        moveHero={moveHero}
        // TODO: 当たりの宝箱を開いた場合、スコアをアップして次のマップに遷移する
        onAButtonPress={() => console.log("Aボタンが押されました")}
      />
      <ChoicesButtonGroup onClick={handleButtonClick} />
      {isCorrect !== null && (
        <div
          className={`mt-4 text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}
        >
          {isCorrect ? "正解!" : "不正解!"}
        </div>
      )}
      <RecordDisplay currentRecord={record} bestRecord={bestRecord} />
    </div>
  );
};

export default Game;
