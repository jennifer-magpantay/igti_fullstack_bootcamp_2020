import React from "react";
import style from './loader.module.css'

export default function Loader() {
  return (
    <div className={style.loader__container}>
      <p>Loading grades...</p>
    </div>
  );
}
