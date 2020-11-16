import React from "react";

export default function FormCalculator({ data, onInputChange }) {
  const { inputCapital, inputInterest, inputTerm } = data;

  const handleInputChange = (input) => {
      onInputChange(input);
    // console.log(input);
  };

  return (
    <form>
      <label htmlFor="capital">Initial Capital</label>
      <input
        type="number"
        id="capital"
        min="100"
        step="50"
        value={inputCapital}
        onChange={handleInputChange}
      />
      <label htmlFor="interest">Monthly Calculation %</label>
      <input
        type="number"
        id="interest"
        min="-12"
        max="12"
        step="0.1"
        value={inputInterest}
        onChange={handleInputChange}
      />
      <label htmlFor="ter">Term</label>
      <input
        type="number"
        id="term"
        min="0"
        max="36"
        step="1"
        value={inputTerm}
        onChange={handleInputChange}
      />
    </form>
  );
}
