function leftPad(value, count = 2, char = "0") {
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

const formatNumber = Intl.NumberFormat("en-UK");
function numberFormatter(value) {
  return formatNumber.format(value);
}

const formatCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
function currencyFormatter(value) {
  return formatCurrency.format(value);
}

const formatPercent = new Intl.NumberFormat("en-UK", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function percentageFormatter(value) {
  return formatPercent.format(value / 100);
}

export { leftPad, numberFormatter, currencyFormatter, percentageFormatter };
