import React from "react";
import style from "./button.module.css";

export default function ButtonAdd({ onAdd, type }) {
  const handleButtonClick = () => {
    onAdd(type);
    console.log("Add new Register");
  };

  return (
    <button
      className={`${style.btn} ${style["btn--add"]}`}
      onClick={handleButtonClick}
    >
      + REGISTER
    </button>
  );
}
