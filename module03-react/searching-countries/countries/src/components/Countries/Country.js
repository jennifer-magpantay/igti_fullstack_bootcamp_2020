import React from "react";
import style from "./countries.module.css";
import { formatNumber } from "../../helpers/formatHelper";

export default function Country({ country }) {
  const { flag, name, code, population } = country;
  return (
    <div className={style.country__container}>
      <img className={style["country--flag"]} src={flag} alt={name} />
      <span className={style.contry__span}>
        {name} - {code}&nbsp;&nbsp;|&nbsp;&nbsp;Country Population:&nbsp;
        {formatNumber(population)}
      </span>
    </div>
  );
}
