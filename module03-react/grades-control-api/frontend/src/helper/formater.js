export default function leftPad(value, count = 2, char = "0") {
  //where, value: what we want to format
  //count: the amount of characters to consider
  //char: what we will use to complete the character, if is needed
  //first, create a variable that will hold value converted toString()
  const number = value.toString();
  let newValue = number;
  //if it is small than count, then, read the positions and complete it
  if (number.length < count) {
    for (let i = 0; i < count - number.length; i++) {
      newValue = char + number;
    }
  }
  return newValue;
}
