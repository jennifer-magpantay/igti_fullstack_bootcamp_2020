import React from "react";
import style from "./card.module.css";

// card just returns its children and style,to be completed and called by candidate component
export default function Card({ children }) {
  return <div className={style.card}>{children}</div>;
}
