var express = require("express"),
  cors = require("cors"),
  http = require("http");
//creating the application
var app = express();
app.use(cors());

//create a function to pick
function getLoteryNumbers() {
  //impelementing the random funtion
  //first, create an empty array
  var numbers = [];
  var positions = 6;
  //add an while loop to create an number according the lenght of the array
  while (numbers.length < positions) {
    var createNumber = getRandomNumbers(1, 60);
    //after create the number, add conditiond to avoid repeated numbers
    //the a number of that is include in the array is different of the created number, then push
    if (!numbers.includes(createNumber)) {
      numbers.push(createNumber);
    }
  }
  return numbers.sort(function (a, b) {
    return a - b;
  });
  //it will retunr the numbers sorted
  //as sort orders strings, then add a callback function (a, b), which will return a-b
}

//create a random function to pick the numbers
//to consider: numbers from 1 to 60, no repeating numbers allowed
function getRandomNumbers(from, to) {
  return Math.max(from, Math.ceil(Math.random() * to));
  //Math.max(from, to) or Math.max(x, y) will gives you a number of a specific range
  //from is the minimal value and to the maximal one
  //Math.ceil() will round the decimal numbers to one up
}

//adding functions to the app
//app get a request from the user and send a response, that will return a function
//app.get("/",function (request, response) { res.json()});
app.get("/", (req, res) => {
  //once the app is started, display a array with six random numbers
  //create a variable to hold the array
  var numbers = getLoteryNumbers();
  //res.json({ numbers });
  res.json(numbers);
});

//opening/running the app:
//setting a server to open the application
var server = http.createServer(app);
//setting the port to the server
var port = 3000;
//then. set the listen to the server
server.listen(port, function () {
  //callback
  console.log("App listening on port " + port);
});
