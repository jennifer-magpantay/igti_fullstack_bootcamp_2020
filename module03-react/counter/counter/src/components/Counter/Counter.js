import React, { useState } from "react";
import ButtonDecrease from "./ButtonDecrease";
import ButtonIncrease from "./ButtonIncrease";
import CounterValue from "./CounterValue";
import style from "./counter.module.css";

export default function Counter() {
  //add states and initial values, if there is one
  const [counter, setCounter] = useState(2);
  // event function as variable to deal with button clicks
  const handleButtonClick = (btnType) => {
    // adding a conditional statement
    // first add the conditiondl and then, after, set the state as response
    // if button type is = to negative, then, subtract one from the counter, otherwise, add 1
    /* setCounter(btnType === "-" ? counter - 1 : counter + 1)*/
    /* btnType === "-" ? setCounter(counter - 1) : setCounter(counter + 1); */
    const counterConditional = btnType === "-" ? counter - 1 : counter + 1;
    setCounter(counterConditional);
  };
  return (
    <>
      {/* add the components buttons and component span and their own props */}
      <div className={style["btn__container"]}>
        {/* for each props declared, pass a 'value' which coulbe a state value or function */}
        <ButtonDecrease onDecrease={handleButtonClick} />
        <CounterValue value={counter} />
        <ButtonIncrease onIncrease={handleButtonClick} />
      </div>
    </>
  );
}
