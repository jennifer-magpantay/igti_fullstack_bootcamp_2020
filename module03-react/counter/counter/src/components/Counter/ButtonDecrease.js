import React from "react";
import style from "./counter.module.css";

export default function ButtonDecrease({onDecrease}) {
  // implement the handle and set button props
  // ps: avoiding using props many times: adding a const to hold onIncrease function
  // const { onDecrease } = props;
  // OR, add it directly as parameter, instead of 'props'
   const handleButtonClick = () => {
    onDecrease("-");
  };

  return (
    <button
      className={`${style.btn} ${style["btn--decrease"]}`}
      onClick={handleButtonClick}
    >
      -
    </button>
  );
}
