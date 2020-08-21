const jurosComposto = (montante, juros, meses) => {
  const percent = (total, part) => {
    let percent = (part * 100) / total;
    percent = percent.toFixed(2);

    return +percent;
  };

  let acumulator = 1;
  let array = [];
  let amountJures = 0;
  let amount = montante;
  let interest = juros * 0.01;
  let profit = 0;
  let percentAcumulator = null;

  while (acumulator <= meses) {
    amountJures = amount * interest;
    profit += amountJures;
    amount += amountJures;

    percentAcumulator = percent(montante, profit);
    array.push({
      amount: +amount.toFixed(2),
      month: acumulator,
      profit: +profit.toFixed(2),
      percentAcumulator,
    });
    acumulator++;
  }

  return array;
};

module.exports = jurosComposto;