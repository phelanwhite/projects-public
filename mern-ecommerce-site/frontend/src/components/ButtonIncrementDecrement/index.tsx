import React, { useEffect, useState } from "react";

const ButtonIncrementDecrement = ({
  onChangeNumber,
  number,
  max,
  min,
}: {
  number: number;
  onChangeNumber?: (value: number) => void;
  min?: number;
  max?: number;
}) => {
  const [value, setValue] = useState(() => number || 0);
  const handleIncrement = () =>
    setValue((prev: number) => (prev === max ? prev : prev + 1));
  const handleDecrement = () =>
    setValue((prev: number) => (prev === min ? prev : prev - 1));

  useEffect(() => {
    onChangeNumber && onChangeNumber(value);
  }, [value]);
  return (
    <div className="flex items-stretch gap-1">
      <button onClick={handleDecrement}>-</button>
      <input
        className="border px-4 flex-1 rounded-lg outline-blue-500"
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default ButtonIncrementDecrement;
