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
      <div className="row">
        {result.map(({ amount, month, profit, percentAcumulator }) => (
          <div className="card col s2" style={{ marginRight: "10px" }}>
            <div
              className="card-header"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              <span>{month}</span>
            </div>
            <div className="card-content">
              <div>
                <div>
                  <span>{formatAmount(amount)}</span>
                </div>

                <div>
                  <span>{+formatNumber(profit) <= 0 ? 'Prejuízo: ': 'Lucro: '}</span>
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
