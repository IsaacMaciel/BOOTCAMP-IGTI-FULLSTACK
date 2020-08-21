const formatter = Intl.NumberFormat("pt-BR");

function formatPercentage(value) {
  const stringValue = value.toFixed(2);

  return stringValue.replace(".", ",") + "%";
}

function formatAmount(value) {
  let stringValue = value.toFixed(2);

  stringValue = stringValue.replace(".", ",");
  return "R$" + stringValue;
}

function formatNumber(value) {
  const stringValue = value.toFixed(2);

  return stringValue.replace(".", ",");
}

module.exports = { formatPercentage, formatNumber, formatAmount };
