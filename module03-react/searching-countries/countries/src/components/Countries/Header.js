import React from "react";
import style from "./countries.module.css";
import { formatNumber } from "../../helpers/formatHelper";

export default function Header({
  filter,
  countryCounting,
  populationCounting,
  onInputChange,
}) {
  const handleInputChange = ({ target }) => {
    // const input = event.target.value;
    const input = target.value;
    onInputChange(input);
  };

  // const { filter, countryCounting, populationCounting } = props;
  return (
    <div className={style.container}>
      <h1 className={style["header__title--app"]}>Country Filter App</h1>
      <form>
        <label htmlFor="input">Add Country</label>
        <input
          type="text"
          id="input"
          name="input"
          value={filter}
          onChange={handleInputChange}
        />
      </form>
      <span className={style.header__span}>Countries: {countryCounting}</span>
      <span className={style.header__span}>
        Total Population: {formatNumber(populationCounting)}{" "}
      </span>
    </div>
  );
}
