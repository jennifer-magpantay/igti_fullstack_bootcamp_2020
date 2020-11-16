window.addEventListener('load', (event) => {
  console.log('Loading page');
});

function getRange() {
  // first things first
  //create a variable for each input range in order to get its values, using .value method
  var green = document.querySelector('#range--green').value;
  var red = document.querySelector('#range--red').value;
  var blue = document.querySelector('#range--blue').value;

  //then, add those values into each individual div/container
  document.getElementById('text--green').innerHTML = green;
  document.getElementById('text--red').innerHTML = red;
  document.getElementById('text--blue').innerHTML = blue;

  //last but not least: set the background color using js .style and using rgb() function to define the colors by (RGB) model
  // values are gotten from the range/input
  // set object.style.backgroundColor = "rgb(x,x,x)" by using template strings
  document.querySelector(
    '#root'
  ).style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

getRange();
