import React from "react";
import style from "./inputSalary.module.css";
//this class will display the input fields, to be required by APP and read by InputReading
//so, lets add event to handle to the input changes when something is typed in

export default function InputSalary({ inputValue, onInputChange }) {
  // add a handle events to call the prop onChange
  const handleInputChange = (event) => {
    const userInput = +event.target.value;
    onInputChange(userInput);
  };
  return (
    <div className={style.container}>
      <label htmlFor="inputSalary">Salário Bruto</label>
      <input
        type="number"
        id="inputSalary"
        step="100"
        min="0"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
        // onChange is the HTML method to identify events
        // onInputChange is the name of the props we set the event when something changes
      />
    </div>
  );
}
