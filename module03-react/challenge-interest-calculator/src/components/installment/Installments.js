import React from "react";
import style from "./installment.module.css";
// import { formatPercentage, formatEuro } from "../../formaters/formatNumbers";
import Installment from "./Installment";

export default function Installments({ installments, calculation }) {
  return (
    <div className={style.container}>
      {/* mapping the prop installment according to its length will return a new component that will receive the calculation results*/}
      {installments.map((item) => (
        <Installment key={item} installment={calculation}>
          {item + 1}
        </Installment>
      ))}
    </div>
  );
}
