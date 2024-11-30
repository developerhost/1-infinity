"use client";

import { useState } from "react";
import ChoicesButtonGroup from "./ChoicesButtonGroup";
import RecordDisplay from "./RecordDisplay";

const Game = () => {
  const [record, setRecord] = useState<number>(1); // 1 -> 1/2, 2 -> 1/4, etc.
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleButtonClick = () => {
    const correct = Math.random() < 0.5; // 1/2の確率で正解
    setIsCorrect(correct);

    if (correct) {
      setRecord((prev) => prev + 1);
    } else {
      setRecord(1); // 不正解時にリセット
    }
  };

  return (
    <div className="flex flex-col items-center">
      <RecordDisplay record={record} />
      <ChoicesButtonGroup onClick={handleButtonClick} />
      {isCorrect !== null && (
        <div
          className={`mt-4 text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}
        >
          {isCorrect ? "正解!" : "不正解!"}
        </div>
      )}
    </div>
  );
};

export default Game;
