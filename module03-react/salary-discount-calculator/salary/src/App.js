import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import InputSalary from "./components/input/InputSalary";
import Results from "./components/card-results/Result";
import BarGraph from "./components/bar-graph/BarGraph";
import "./index.css";
import { calculateSalaryFrom } from "./helpers/salaryCalculation";

export default function App() {
  const [inputSalary, setInputSalary] = useState(100);
  const [salary, setSalary] = useState([]);

  //add use effect to set the calculations once the page is loades
  useEffect(() => {
    // the calculation will use as param the inputSalary values -set with inital value of 100
    const salaryCalculation = calculateSalaryFrom(inputSalary);
    // then, the salary will be set with the results from this calculation
    setSalary(salaryCalculation);
    // add inputSalary as deps - updating at every change
  }, [inputSalary]);

  // handling events
  // events: when the input changes:
  // 1) read the input value and set the array value
  const handleInputChange = (userInput) => {
    // this will set a 'new' value for the input salary when the input field changes
    // the new value is set from the user input value
    setInputSalary(userInput);
  };

  return (
    <>
      <Header>
        <h1>Wages Calculation</h1>
      </Header>
      {/* add InputSalary component + props inputValue & onInputChange */}
      <InputSalary inputValue={inputSalary} onInputChange={handleInputChange} />
      <Results results={salary} />
      <div className="graph--container">
        <BarGraph value={salary.discountINSS} color="var(--inss)" />
        <BarGraph value={salary.discountIRPF} color="var(--irpf)" />
        <BarGraph value={salary.netSalary} color="var(--salary)" />
      </div>
    </>
  );
}
