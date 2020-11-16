import React from "react";
import style from "./picture.module.css";

// picttures return a image with source and alt based on its props
export default function Picture({ imgSource, description }) {
  return <img src={imgSource} alt={description} className={style.img} />;
}
