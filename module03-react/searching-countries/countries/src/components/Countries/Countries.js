import React from "react";
import style from "./countries.module.css";
import Country from "./Country";

export default function Countries({ countries }) {
  return (
    <div className={style.container}>
      <h2 className={style["country__title--results"]}>Results</h2>
      <ul>
        {countries.map((item) => {
          return (
            <li key={item.id}>
              <Country country={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
