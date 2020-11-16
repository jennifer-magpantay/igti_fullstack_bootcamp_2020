import React from "react";
import style from "./counter.module.css";

export default function ButtonIncrease({onIncrease}) {
  // implement the handle and set button props
  // ps: avoiding using props many times: adding a const to hold onIncrease function
  // const { onIncrease } = props;
  // OR, add it directly as parameter, instead of 'props'
  const handleButtonClick = () => {
    onIncrease("+");
  };

  return (
    <button
      className={`${style.btn} ${style["btn--increase"]}`}
      onClick={handleButtonClick}
    >
      +
    </button>
  );
}
