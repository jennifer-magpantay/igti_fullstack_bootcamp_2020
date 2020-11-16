import React from "react";

export default function InputForm({ inputValue, onChange }) {
  const handleInputChange = (event) => {
    const input = event.target.value;
    onChange(input);
    console.log(input);
  };
  return (
    <div>
      <label htmlFor="initialCapital">Initial Capital</label>
      <input
        type="number"
        id="initialCapital"
        min="100"
        step="1"
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
}
