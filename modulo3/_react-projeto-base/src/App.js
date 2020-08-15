import React, { useState } from "react";
import Input from "./components/ProjetoBase/Input";
import Chart from "react-google-charts";

import { calculateSalaryFrom } from "./helpers/salary";

export default () => {
  const [salary, setSalary] = useState(calculateSalaryFrom(1400));

  const pieOptions = {
    slices: [
      {
        color: "#2BB673",
      },
      {
        color: "#d91e48",
      },
      {
        color: "#007fad",
      },
    ],
    legend: {
      position: "bottom",
      aligment: "center",
    },
  };

  return (
    <div className="container">
      <h5 className="center">Calculadora de Salário</h5>
      <div className="row">
        <Input
          value={salary.fullSalary}
          labelName={"Salário Bruto"}
          type={"number"}
          style={"input-field col s6"}
          input={(e) => setSalary(calculateSalaryFrom(+e.target.value))}
        ></Input>
        <Input
          disabled={true}
          style={"input-field col s6"}
          value={`R$ ${salary.netSalary} (${salary.percentNetSalary} %)`}
          color={"#2BB673"}
          labelName={"Salário Líquido"}
        ></Input>
      </div>

      <div className="row">
        <Input
          disabled={true}
          type={"text"}
          value={`R$ ${salary.baseINSS}`}
          labelName={"Base INSS"}
        ></Input>
        <Input
          disabled={true}
          type={"text"}
          color={"#d91e48"}
          value={`R$ ${salary.discountINSS} (${salary.percentINSS} %)`}
          labelName={"Desconto INSS"}
        ></Input>

        <Input
          disabled={true}
          type={"text"}
          value={`R$ ${salary.baseIRPF}`}
          color={"#007fad"}
          labelName={"Base IRPF"}
        ></Input>
        <Input
          disabled={true}
          type={"text"}
          value={`R$ ${salary.discountIRPF} (${salary.percentIRPF} %)`}
          labelName={"Desconto IRPF"}
        ></Input>
      </div>

      <Chart
        width={"1000px"}
        height={"500px"}
        chartType="PieChart"
        loader={<div>Carregando...</div>}
        data={[
          ["Task", "Hours per Day"],
          ["Salário Liquído", salary.netSalary],
          ["Desconto INSS", salary.discountINSS],
          ["Desconto IRPF", salary.discountIRPF],
        ]}
        options={pieOptions}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};
