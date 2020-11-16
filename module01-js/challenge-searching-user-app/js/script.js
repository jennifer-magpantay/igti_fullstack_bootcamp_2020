/* descriptin of the challenge 
  get dada from the api/url
  extract from the api specific data - map(), such as name (first, last), picture, age and gender 
  display total of users found on section headers - reduce()
  display a bunch of statistics
  display the data in alphabetic order  - sort(a,b) - compare...
  format numbers using Js
*/
//seeting global variables
//save data here
let dataList = [];
let filterList = [];
// set results for sections
let results = null;
let statistics = null;
// headers
let countResults = null;
// statistics
let ageSum = null;
let ageAverage = null;
let femaleSum = null;
let maleSum = null;
// input
let inputName = null;

//load page
window.addEventListener("load", () => {
  //mapping dom - identify where to display the results
  results = document.querySelector("#results");
  countResults = document.querySelector("#headerResults");
  statistics = document.querySelector("#statistics");
  femaleSum = document.querySelector("#countFemale");
  maleSum = document.querySelector("#countMale");
  ageSum = document.querySelector("#sumAges");
  ageAverage = document.querySelector("#averageAge");
  //from where get input information
  inputName = document.querySelector("#inputName");
  //number format
  numberFormat = Intl.NumberFormat("pt-BR");
  //once the page is loaded, call fetch data
  fetchData();
});

//fetch data with async / await
async function fetchData() {
  const url =
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";
  const res = await fetch(url);
  const json = await res.json();
  //because the data is saved into a const { results: [] }, pass the results argument to the map() method - map works just for arrays!
  dataList = json.results
    .map((item) => {
      //map just the elements we want to search and work with
      const { picture, name, dob, gender } = item;
      return {
        picture: picture.thumbnail,
        name: name.first + " " + name.last,
        age: dob.age,
        gender: gender,
      };
      // sort the results
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  // console.log(dataList);
  // the dara is saved but not displayed
  //it will be displayed just after few events: typing, enter or clicking button
  preventEventDefault();
}

function preventEventDefault() {
  //create the function to handle all the events
  function handleEvents(event) {
    checkInputTyping();
    event.preventDefault();
  }
  //add prevent default on those events
  const form = document.querySelector("form");
  form.addEventListener("submit", handleEvents);

  const buttonSearch = document.querySelector("#buttonSearch");
  buttonSearch.addEventListener("click", handleEvents);
  // const.addEventListener("click", function(event){ event.preventDefault() });

  const buttonClear = document.querySelector("#buttonClear");
  buttonClear.addEventListener("click", (handleEvents) => clearInput());
}

function checkInputTyping() {
  function typingKey(event) {
    //add conditiond according to the typinh inpu
    //avoiding empty input
    if (event.target.value === "") {
      alert("Type something to continue");
      //looking throught the list to find any results
    }
    //if input it is not emppty OR and enter is pressed - then...
    if (event.target.value !== "" || event.key === "Enter") {
      filterData(event);
      //call method to looking throught the list to find any results
      // console.log(event);
      // console.log("Input value: ", event.target.value.toLowerCase());
    }
  }
  inputName.addEventListener("keyup", typingKey);
  inputName.focus();
  //The focus() method is used to give focus to an element (if it can be focused).
}

function filterData(event) {
  //filter tha data list that includes x value
  // === value does not work - it will return just the right content word
  filterList = dataList.filter((item) =>
    item.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  render();
}
//when the list is render, has to display the information from the users and statistics
//both information will be based on the search criteria
function render() {
  renderUserList();
  renderHeaderSummary();
}

function renderUserList() {
  let div = "";
  filterList.forEach((item) => {
    const { picture, name, age } = item;
    const element = `
    <div class="list">
    <img src="${picture}" alt="${name}" />
    <p>${name}, ${age}</p>
    </div>
    `;
    div += "<div>" + element + "</div>";
  });
  //then, add this to the html
  results.innerHTML = div;
  // console.log("Rendering data to display");
}

function renderHeaderSummary() {
  // headers
  countResults.textContent = filterList.length;
  // statistics: gender female - filter than get the list length
  const fem = filterList.filter((item) => item.gender === "female").length;
  femaleSum.textContent = formatNumber(fem);
  //gender male - filter than get the list length
  const man = filterList.filter((item) => item.gender === "male").length;
  maleSum.textContent = formatNumber(man);
  // sum
  const age = filterList.reduce((acc, curr) => acc + curr.age, 0);
  ageSum.textContent = formatNumber(age);
  //average
  const total = age / filterList.length;
  ageAverage.textContent = formatNumber(total);
}

function clearInput() {
  //to 'clear' the input field, set a new value to the variable, as an empty string
  //when the button clear is pressed, the input field is cleared
  inputName.value = "";
  inputName.focus();
}

function formatNumber(number) {
  return numberFormat.format(number);
  // add the method to the statistics
}

/* 
console.log("Loading page");
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
  */
