import React from "react";
import style from "./installment.module.css";
import { formatPercentage, formatEuro } from "../../formaters/formatNumbers";

export default function Installment({ children, installment }) {
  return (
    <div className={style.container}>
      <ul>
        <li>
          <span>Month: {children} </span>
        </li>
        <li>
          <span className={style.total}>
            Capital Accumulated: {formatEuro(installment.baseAcc)}
          </span>
        </li>
        <li>
          <span className={style.income}>
            Income: {formatEuro(installment.incomeAcc)}
          </span>
        </li>
        <li>
          <span className={style.percentage}>
            Percentual: {formatPercentage(installment.percentAcc)}
          </span>
        </li>
      </ul>
      <hr />
    </div>
  );
}
