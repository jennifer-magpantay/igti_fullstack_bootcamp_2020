window.addEventListener("load", (event) => {
  console.log("Loading page");
});

function getNumbers() {
  //add to the button the event listener
  var button = document.querySelector("#button");
  button.addEventListener("click", handleClick);
}

//inside the event, use fetch to get the result from the functions on the back end by using fetch and set it inside the root
function handleClick() {
  //defining a variable for the root (html) element
  var root = document.querySelector("#root");
  root.innerHTML = "";

  /*fetch structure: 
  fetch(url).then(res => { res.json().then(json => {//do something})}; */

  fetch("http://localhost:3000").then((res) => {
    res.json().then((json) => {
      //add to the root, the response from localshot in json format
      //convert the json into string
      root.textContent = JSON.stringify(json, null, 2);
    });
  });
}

getNumbers();
