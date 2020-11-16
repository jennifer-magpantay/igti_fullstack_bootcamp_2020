import React from "react";
import style from "./loader.module.css";

// loader will return a fading out effect screen, meanwhile the app is loaded
export default function Loader() {
  return (
    <div className={style.loader__container}>
      <span>Loading page...</span>
    </div>
  );
}
