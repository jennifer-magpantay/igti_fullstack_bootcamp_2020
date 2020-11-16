import React from "react";
import style from "./button.module.css";

export default function ButtonEdit({ id, type, onEdit }) {
  const handleButtonClick = () => {
    onEdit(id, type);
    // console.log(id, type);
  };

  return (
    <button
      className={`${style.btn} ${style["btn--edit"]}`}
      onClick={handleButtonClick}
    >
      EDIT
    </button>
  );
}
