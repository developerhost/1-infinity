import React from "react";

type RecordDisplayProps = {
  record: number;
};

const RecordDisplay = ({ record }: RecordDisplayProps) => {
  // 1/1 -> 1/2, 2 -> 1/4, etc.
  const displayValue = `1/${record === 1 ? 1 : 2 ** (record - 1)}`;

  return <div className="mb-4 text-xl font-semibold">記録: {displayValue}</div>;
};

export default RecordDisplay;
