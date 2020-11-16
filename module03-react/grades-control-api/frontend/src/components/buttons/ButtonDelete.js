import React from "react";
import style from "./button.module.css";

export default function ButtonDelete({ id, type, onDelete }) {
  const handleButtonClick = () => {
    onDelete(id, type);
  //   console.log(id, type);
  };

  return (
    <button
      className={`${style.btn} ${style["btn--delete"]}`}
      onClick={handleButtonClick}
    >
      DELETE
    </button>
  );
}
