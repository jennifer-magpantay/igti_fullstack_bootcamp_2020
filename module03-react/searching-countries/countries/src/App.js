import React, { useState, useEffect } from "react";
import Countries from "./components/Countries/Countries";
import Header from "./components/Countries/Header";

export default function App() {
  // set the states of the app
  // where: countries holds all countries from the API, filteredCountries holds the filter results and filter
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [population, setPopulation] = useState(0);
  const [filter, setFilter] = useState("");

  //add methods of the class
  //lifecycle components:  for functional components,use useEffects instead componentDidMount and so on
  // it is a good practice use an useEffect for each state, instead of all-in-one
  // set countires & filter countries
  useEffect(() => {
    // pass the async function
    /* async function fetchData() {}*/
    const fetchData = async () => {
      //1)get request from the api to read its content
      const url = "https://restcountries.eu/rest/v2/all";
      const res = await fetch(url);
      let data = await res.json();
      //2)add map() to generate your list
      data = data.map(({ numericCode, flag, name, alpha2Code, population }) => {
        return {
          flag,
          id: numericCode,
          name,
          code: alpha2Code,
          population,
        };
      });
      // set the states
      setCountries(data);
      setFilterCountries(Object.assign([], countries));
    };
    // call the async function to be executed
    fetchData();
  }, []);
  // ps: [] does not load the array when the app is loades
  // if added [countries] the filter does not changes with the results - WHY??
  // ps: useEffect with fetch: useEffect ( async() => {}) it will gives error! It is not supported!

  // set population
  useEffect(() => {
    // 3) setting the total population number according the the list
    const populationTotal = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
    setPopulation(populationTotal);
  }, []);

  //the app will be load with the list of all countries, number of countries within the list and total of population

  // 5) call a handle event method to the input field (set on Header)
  const handleInputChange = (input) => {
    //6) set the state to filter to receive the input/text values when the input changes
    setFilter(input);
    //7) then add a filter() to get the results from the match between input field and input text
    //use includes() to get every single match from your filter, not just the whole word
    const filterResults = countries.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    //8) adding a new couting for the population - it will count the population according to the filter results
    const populationResults = filterResults.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
    //9) finally, set the final state to the filteredCountries
    setFilterCountries(filterResults);
    setPopulation(populationResults);
  };

  return (
    <>
      <Header
        filter={filter}
        onInputChange={handleInputChange}
        countryCounting={filterCountries.length}
        populationCounting={population}
      />
      <Countries countries={filterCountries} />
    </>
  );
}
