const formatNum = Intl.NumberFormat("en-UK");
function formatNumber(value) {
  return formatNum.format(value);
}

const formatCurrency = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "EUR",
});
function formatEuro(value) {
  return formatCurrency.format(value);
}

const formatPercent = new Intl.NumberFormat("en-UK", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPercentage(value) {
  return formatPercent.format(value / 100);
}

export { formatNumber, formatPercentage, formatEuro };
