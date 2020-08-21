import React from "react";

import {
  formatNumber,
  formatPercentage,
  formatAmount,
} from "../helpers/formatNumber";

export default function Card({ result }) {
  const array = result;

  if (array && array.length != 0) {
    return (
      <div className="row" style={{marginRight:"10px"}}>
        {result.map(({ amount, month, profit, percentAcumulator }) => (
          <div className="card col s2">
            <div className="card-content">
              <div>
                <div>
                  <span>{formatAmount(amount)}</span>
                </div>
                <div>
                  <span>{month}</span>
                </div>
                <div>
                  <span>{formatNumber(profit)}</span>
                </div>
                <div>
                  <span>{formatPercentage(percentAcumulator)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Não há nada a ser exibido</div>;
  }
}
