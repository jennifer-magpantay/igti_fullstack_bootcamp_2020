//import file system module
import { promises as fs } from "fs";
/*
practical work tasks:
1)based on State file, create a JSON file for each state of the file
this generated JSON file has to hold all cities from each state, as is saved on the city JSON file
then, create a few methods:
2)
3)display a top five list about the ststes with more cities
4)display a top five list about the ststes with less cities
5)display the city with the longest name, for each state
6)display the city with the shortest name, for each state
7)display the city with the longest name, from all states 
8)display the city with the shortest name, from all state 
*/
//global variables for reading the data files
const dataState = JSON.parse(await fs.readFile("./data/Estados.json"));
const dataCity = JSON.parse(await fs.readFile("./data/Cidades.json"));
//calling the functions
init();
async function init() {
  await creatingFiles();
  console.log("::Getting amount of cities by UF: ", await getCities("AM"));
  await getListCities();
  //longest names
  console.log(
    "::Getting the longest name city by UF: ",
    await getLongNameCities("MG")
  );
  await getLongestNameCitiesByState();
  await reduceLongestName();
  //shortest names
  console.log(
    "::Getting the shortest name city by UF: ",
    await getShortNameCities("MG")
  );
  await getShortestNameCitiesByState();
  await reduceShortestName();
}
//1) generate the json files
async function creatingFiles() {
  //firstly, lets read Estados
  //for each item from the data (Estados files), create a new JSON file, named by the Sigla value + ".json"
  dataState.forEach((state) => {
    //to get the match we want, pass a filter() into cities where the city ID will match the state ID
    const file = dataCity.filter((city) => city.Estado === state.ID);
    // console.log(file);
    //now, write the file into the folder states, naming by the Sigla values + .json and the parameter the const file
    fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(file));
  });
}
//2) create a method to return the amount of cities of an expected state, using it as parameter
async function getCities(uf) {
  //reading/calling the file using UF as parameter to
  const readData = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  //then, retunr the data lenght
  return readData.length;
  // console.log(readData);
  // console.log(readData.length);
}
//3)top five list: ststes with more cities
async function getListCities() {
  //lets create empty arrays to hold ours lists
  const list = [];
  const resultMoreCities = [];
  const resultLessCities = [];
  //then, lets read Estados and for each state, add to the list the ampunt of cities of each state
  //ps: a forEach() wont work and will return a <peding> error message
  //use for of loop //ps: fot(state of dataState) gives error message because 'state' was not declared!
  for (const state of dataState) {
    //create a variable to hold the city amount
    const amount = await getCities(state.Sigla);
    //and add it as a property into the file
    list.push({ UF: state.Sigla, amount });
  }
  //once you have the list, sort it but descent order to get state with more cities
  const moreCities = list.sort((a, b) => b.amount - a.amount);
  //then, use slice to get a inital and final index and save it into an array
  moreCities
    .slice(0, 5)
    .forEach((item) => resultMoreCities.push(item.UF + ":" + item.amount));
  console.log("::Top 5 List o States with more cities: ", resultMoreCities);
  //and finally, sort it again in ascendent order to get state with less cities
  const lessCities = list.sort((a, b) => a.amount - b.amount);
  lessCities
    .slice(0, 5)
    .forEach((item) => resultLessCities.push(item.UF + ":" + item.amount));
  console.log("::Top 5 List o States with less cities: ", resultLessCities);
}

//5)get city with the longest name of each state
//this method will be splited into two parts:
//A)a method that will retunr the longest name by a UF 
//B)a method that will return an array with the longest names by each state
//create a method that will return the leght of the citites
//ordered it by longest and shortest one could delay the process depending on the size of the data
//a better way to do it is by iteration/forEach()
async function getLongNameCities(uf) {
  //first, create an variable to hold values
  let result;
  //then, read each file using their UF as parameter
  const readData = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  //setting a forEach() with a conditions in it
  readData.forEach((city) => {
    //if the result is != than null, then set result as city
    if (!result) {
      result = city;
    }
    //if the city.Nome.length > result.Nome.length, them set the result with the current city values
    //.split(" ").join("").length will cutt of all spaces
    else if (
      city.Nome.split(" ").join("").length >
      result.Nome.split(" ").join("").length
    ) {
      result = city;
    }
    //if there are two city.Nome.length === result.Nome.length, then, sort it them by using ltoLowerCase() - ???
    else if (
      city.Nome.split(" ").join("").length ===
        result.Nome.split(" ").join("").length &&
      city.Nome.toLowerCase() < result.Nome.toLowerCase()
    ) {
      result = city;
    }
  });
  return result;
  //if you try to return a different result it will affect the getNameCitiesAllStates() and maybe wont work
}
//now, lets implement the method to get all states together
async function getLongestNameCitiesByState() {
  //create an empty array to hold the results
  const list = [];
  //lets read first the Estados file using a for of loop
  for (const state of dataState) {
    //create a variable to hold the city amount
    const city = await getLongNameCities(state.Sigla);
    //and add it as a property into the file
    // list.push(city);
    list.push("City: " + city.Nome + ", UF: " + state.Sigla);
  }
  console.log("::List with longest name cities by State", list);
  //has to return a list with the Name of the City followed by the State UF
}
// 7)display the city with the longest name, from all states
async function reduceLongestName() {
  //read the data
  //iterate it using a for loop
  //create a array list with results
  //use reduce to this list to get the longest name
  const list = [];
  for (const state of dataState) {
    const city = await getLongNameCities(state.Sigla);
    list.push({ name: city.Nome, length: city.Nome.length, uf: state.Sigla });
  }
  // console.log(list);
  const result = list.reduce((prev, curr) => {
    if (prev.name.length > curr.name.length) {
      return prev;
    } else if (prev.name.length < curr.name.length) {
      return curr;
    } else
      return prev.name.toLowerCase() < curr.name.toLowerCase() ? prev : curr;
  });
  console.log(`::Longest City Name: ${result.name}, UF: ${result.uf}`);
}
//to get the shortest name, we have to follow the same logic from the previous methods
//get the city names - short
async function getShortNameCities(uf) {
  let result;
  const readData = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  readData.forEach((city) => {
    if (!result) {
      result = city;
    } else if (city.Nome.length < result.Nome.length) {
      result = city;
    } else if (
      city.Nome.length === result.length &&
      city.Nome.toLowerCase() < result.Nome.toLowerCase()
    ) {
      result = city;
    }
  });
  return result;
}
//get the city names by state - short
async function getShortestNameCitiesByState() {
  //create an empty array to hold the results
  const list = [];
  //lets read first the Estados file using a for of loop
  for (const state of dataState) {
    const city = await getShortNameCities(state.Sigla);
    list.push("City: " + city.Nome + ", UF: " + state.Sigla);
  }
  console.log("::List with shortest name cities by State", list);
}
// 8)display the city with the shortest name, from all state
async function reduceShortestName() {
  //read the data
  //iterate it using a for loop
  //create a array list with results
  //use reduce to this list to get the longest name
  const list = [];
  for (const state of dataState) {
    const city = await getShortNameCities(state.Sigla);
    list.push({ name: city.Nome, length: city.Nome.length, uf: state.Sigla });
  }
  // console.log(list);
  const result = list.reduce((prev, curr) => {
    //change the operators side
    if (prev.name.length < curr.name.length) {
      return prev;
    } else if (prev.name.length > curr.name.length) {
      return curr;
    } else
      return prev.name.toLowerCase() < curr.name.toLowerCase() ? prev : curr;
  });
  console.log(`::Shortest City Name: ${result.name}, UF: ${result.uf}`);
}
