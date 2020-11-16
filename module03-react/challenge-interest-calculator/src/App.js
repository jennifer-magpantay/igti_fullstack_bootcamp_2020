import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Installments from "./components/installment/Installments";
// import FormCalculator from "./components/form/FormCalculator";
import { calculateInterest } from "./services/calculation";
import style from "./app.module.css";

export default function App() {
  // add states for the app: inital capital, monthly interest rate, term
  const [capital, setCapital] = useState(100);
  const [interest, setInterest] = useState(0);
  const [term, setTerm] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [calculation, setCalculation] = useState([]);

  // setting effect to trigger the calculation function once one of the states changes
  useEffect(() => {
    const calculationsFromInput = calculateInterest(capital, interest, term);
    setCalculation(calculationsFromInput);
    // calculateInterest(capital, interest, term)
  }, [capital, interest, term]);
  console.log(calculation);

  // a number of installment components will be generated everytime the state term changes
  useEffect(() => {
    // for that, pass its value as array and save into installments state, which will be used by Installments to generate the components
    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    const array = Array.from({ length: term }, (v, i) => i);
    // eventhough we are seting the state for installments, we are doing based on term lenght
    setInstallments(array);
  }, [term]);
  // console.log(installments);

  //   handle events
  const handleInputChange = (event) => {
    const input = event.target.value; // return the input values
    const inputID = event.target.id; //return the ID from the inputs
    if (inputID === "initialCapital") {
      setCapital(+input);
    }
    if (inputID === "monthlyCalculation") {
      setInterest(input);
    }
    if (inputID === "term") {
      setTerm(+input);
    }
  };

  return (
    <div>
      <Header>
        <h1>INTEREST CALCULATOR</h1>
        <hr />
      </Header>
      <div className={style["container--lg"]}>
        <div className={style["container--md"]}>
          <h3>Add values in the form below</h3>
          {/* <FormCalculator data={{capital, interest, term}} onInputChange={handleInputChange} */}
          {/* Form is not making the calculations - not working properly! */}
          <form>
            <label htmlFor="initialCapital">Initial Capital</label>
            <input
              type="number"
              id="initialCapital"
              min="100"
              step="50"
              value={capital}
              onChange={handleInputChange}
              data-sign="-"
            />
            <label htmlFor="monthlyCalculation">Monthly Calculation %</label>
            <input
              type="number"
              id="monthlyCalculation"
              min="-12"
              max="12"
              step="0.1"
              value={interest}
              onChange={handleInputChange}
            />
            <label htmlFor="term">Term</label>
            <input
              type="number"
              id="term"
              min="0"
              max="36"
              step="1"
              value={term}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className={style["container--md"]}>
          <h3>Calculations</h3>
          {/* adding installments to read the inputs and passing the calculatios values to be loaded by Installment */}
          <Installments installments={installments} calculation={calculation} />
        </div>
      </div>
    </div>
  );
}
