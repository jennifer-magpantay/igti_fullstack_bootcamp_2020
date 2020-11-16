import React from "react";
import style from "./results.module.css";
import {
  currencyFormatter,
  percentageFormatter,
} from "../../helpers/formaters";

// results will return a collection of: {baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary}
export default function Result({ results }) {
  return (
    <>
      <h2>Calculation & Discounts</h2>
      <div className={style["card--container"]}>
        <div className={style.card}>
          <label className={style.inss}>INSS Base</label>
          <span className={style.inss}>
            {currencyFormatter(results.baseINSS)}
          </span>
        </div>
        <div className={style.card}>
          <label className={style.inss}>INSS Discount</label>
          <span className={style.inss}>
            {currencyFormatter(results.discountINSS)}
            &nbsp;&nbsp;({percentageFormatter(results.inssBaseDiscount)})
          </span>
        </div>
        <div className={style.card}>
          <label className={style.irpf}>IRPF Base</label>
          <span className={style.irpf}>
            {currencyFormatter(results.baseIRPF)}
          </span>
        </div>
        <div className={style.card}>
          <label className={style.irpf}>IRPF Discount</label>
          <span className={style.irpf}>
            {currencyFormatter(results.discountIRPF)}&nbsp;&nbsp;(
            {percentageFormatter(results.irpfBaseDiscount)})
          </span>
        </div>
        <div className={style.card}>
          <label className={style.net}>Liquid Salary</label>
          <span className={style.net}>
            {currencyFormatter(results.netSalary)}
            &nbsp;&nbsp;({percentageFormatter(results.netSalaryDiscount)})
          </span>
        </div>
      </div>
    </>
  );
}
