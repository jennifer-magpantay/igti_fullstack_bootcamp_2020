window.addEventListener("load", start);
console.log("Loading page");

/* what has to be done by the application */
/* the user can add, delete or update a name from a list
adding a name: the user has to type a new name inside the input field and press enter
when enter is pressed, then, the new name will be added at the end on the list and the list will be reload with the new element
deleting a name: every element/name of the list has its own delete button. once it is pressed, it is pretty much straigh forward: the item at that index will be delete from the list
updating a name: each elemt/name has its own edit button. when it is pressed, the name will appear into input field to be edited. once is done, the usar has to press enter to update the edition
to consider: 
after a new name or edition, the input field has to ble cleared
empty values are not allowed */

//satring the application:
//1) create global variables as the array list with names/string
var listNames = ["Jennifer", "Andre", "Estela", "Ana", "Carlos"];
var inputName = null;
var isEditing = false;
var currentIndex = null;

//2)create an start method which will start the functions in a specific order, as they are going
function start() {
  //variable that will hold the value from the input field
  inputName = document.querySelector("#input--name");

  preventEvent();
  activateInput();
  readNames();
}

//3)function to avoid the page to reload everytime the key enter is pressed
function preventEvent() {
  function handleEventSubmit(event) {
    event.preventDefault();
  }
  //add to the form an event submit which will call thw function to handle the event
  var form = document.querySelector("form");
  form.addEventListener("submit", handleEventSubmit);
}

//4)activate() which will hold a bunch of functions (crud)
function activateInput() {
  function createName(newName) {
    listNames.push(newName);
    //push() will add the name into the arraylist, at last index
    readNames();
    // console.log(listNames);
  }

  function updateName(newName) {
    listNames[currentIndex] = newName;
  }

  //5)handletyping() will check the input field meanwhuile the user is typing to set our event
  function handleTyping(event) {
    //add conditions using as based what the user will type in
    //holding with empy inputs (not allowed)
    //create a variable to hold an input value not empty (!=="")
    var hasText = !!event.target.value && event.target.value.trim() !== "";
    //add a condition, if the input is empty, return and stop, till the value is different of empty
    if (!hasText) {
      clearInput();
      return;
    }
    //next step: to set the event JUST when the (key) Enter is pressed, then add if statement/condition
    if (event.key === "Enter") {
      //once the enter is set, do:
      //then, check if the input is a editing/updating, suing a nested if
      if (isEditing) {
        updateName(event.target.value);
      } else {
        //grab the target value of the input and add it to the array list of names by the function addName()
        createName(event.target.value);
        //createName(event.target.value)
      }
      //once is done, reload the list and clear the input field
      readNames();
      isEditing = false;
      clearInput();
    }
  }
  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
  //keyup: works as a trigger event that will be set (handleTyping()) when the keyboard is hit
}

//6)create a function to read and dislplay the list
function readNames() {
  //how the list will be displayed? unordered list, which contains delete button, edit button and name
  //first: create delete button and its function
  //the delete button will take the index of a element/name as paramereter, to delete it at its own index
  function createDeleteButton(index) {
    //add the function to delete the item/name
    function deleteName() {
      listNames.splice(index, 1);
      //splice() will delete just 1 element at the index
      readNames();
    }
    //then, create the element button
    var button = document.createElement("button");
    //add to the button a class name, to apply CSS
    button.classList.add("button--delete");
    button.textContent = "X";
    //add event to the button: when it is clicked,  call the delete function
    button.addEventListener("click", deleteName);
    return button;
  }

  //now, create edit button and its function
  //the edit button will take the name of the element + index as parameneter
  function createEditButton(name, index) {
    //function to edit the name
    function editName() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
      //this will avoid to reenter a new item when the update is cicked
      //the update has to replace the item, not add a new one!!
    }
    //then, create the edit button element
    var button = document.createElement("button");
    //add to the button a class name, to apply CSS
    button.classList.add("button--edit");
    button.textContent = "EDIT";
    //add event to the button: when it is clicked, call the edit name function
    button.addEventListener("click", editName);
    return button;
  }

  //once buttons are done, create an ul/li element according to the lenght of the list
  var ul = document.createElement("ul");
  //for that, use a for each loop to read the array/list
  for (var i = 0; i < listNames.length; i++) {
    var currentName = listNames[i];
    //for each item, create a li element
    var li = document.createElement("li");
    //and for each li/item of the list, call the functions to create delete and edit buttons and create a span t hold the  text/mames
    //calling functions by variables
    var buttonDelete = createDeleteButton(i);
    var buttonEdit = createEditButton(currentName, i);
    var span = document.createElement("span");
    span.textContent = currentName;
    //append the variables to the list
    li.appendChild(buttonDelete);
    li.appendChild(buttonEdit);
    li.appendChild(span);
    //finally, append li to the ul
    ul.appendChild(li);
  }
  //append the ul to the var list/root BUT...
  //first: to avoid replicate the array over and over, set the root with an empty string
  var list = document.querySelector("#root");
  list.innerHTML = "";
  list.appendChild(ul);
  //once is done, clear the input field
  clearInput();
}

//when the key Enter is pressed, the input field is cleared
function clearInput() {
  //to 'clear' the input field, set a new value to the variable, as an empty string
  inputName.value = "";
  inputName.focus();
}

start();
