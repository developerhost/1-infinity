"use client";

import { useState, useEffect } from "react";
import ChoicesButtonGroup from "./ChoicesButtonGroup";
import RecordDisplay from "./RecordDisplay";
import GameController from "./controller/GameController";
import { useHeroMovement } from "./useHeroMovement";

const Game = () => {
  const [record, setRecord] = useState<number>(1); // 1 -> 1/2, 2 -> 1/4, etc.
  const [bestRecord, setBestRecord] = useState<number>(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const roomMap = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 4, 5, 8, 8, 8, 0, 6, 9],
    [9, 8, 8, 8, 8, 8, 8, 8, 9],
    [9, 8, 8, 8, 1, 8, 8, 2, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
  ];

  const initialPosition = { row: 1, col: 6 };

  // TODO: 勇者の移動処理を追加
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { heroPosition, moveHero } = useHeroMovement(initialPosition, roomMap);

  // オプション: ローカルストレージからベスト記録を取得
  useEffect(() => {
    const storedBestRecord = localStorage.getItem("bestRecord");
    if (storedBestRecord) {
      setBestRecord(Number(storedBestRecord));
    }
  }, []);

  // オプション: ベスト記録が更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("bestRecord", bestRecord.toString());
  }, [bestRecord]);

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
