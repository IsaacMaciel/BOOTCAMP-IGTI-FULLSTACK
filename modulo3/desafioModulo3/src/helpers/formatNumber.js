const formatter = Intl.NumberFormat("pt-BR");

function formatPercentage(value) {
  const stringValue = value.toFixed(2);

  return stringValue.replace(".", ",") + "%";
}

// function formatAmount(value) {
//   let formated = formatter.format(value)

//   // stringValue = stringValue.replace(".", ",");
//   return "R$" + formated;
// }

function formatNumber(value) {
  let formated = formatter.format(value);

  formated = "R$ " + formated;

  return {
    formated,
    value
  }

  
}

module.exports = { formatPercentage, formatNumber };
