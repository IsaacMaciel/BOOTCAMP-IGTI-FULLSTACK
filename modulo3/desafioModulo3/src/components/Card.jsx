import React from "react";

import {
  formatNumber,
  formatPercentage,
} from "../helpers/formatNumber";
import Profit from "./Profit";
import Amount from "./Amount";

export default function Card({ result }) {
  const array = result;

  if (array && array.length != 0) {
    return (
      <div className="row">
        {result.map(({ amount, month, profit, percentAcumulator }) => (
          <div className="card col s2" style={{ marginRight: "10px" }}>
            <div
              className="card-header"
              style={{ fontWeight: "bold", fontSize: "24px",textAlign:"center" }}
            >
              <span>{`Mês: ${month}`}</span>
            </div>
            <div className="card-content" style={{textAlign:"center", fontSize:"20px"}}>
              <div>
                <div>
                 
                  <Amount amount={formatNumber(amount)}t/>
                </div>
                <Profit profit={formatNumber(profit)} />
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
