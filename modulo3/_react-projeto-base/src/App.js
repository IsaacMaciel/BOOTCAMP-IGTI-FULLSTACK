import React, { Component } from "react";
import ProjetoBase from "./components/ProjetoBase/ProjetoBase";

import { calculateSalaryFrom } from "./helpers/salary";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
      baseINSS: null,
      discountINSS: null,
      baseIRPF: null,
      discountIRPF: null,
      netSalary: null,
    };
  }

  handleSalaryInput = (event) => {
   this.setState({
     fullSalary: +event.target.value,
   })

  };

  componentDidUpdate = (prevsProp, prevsState) => {
    const {fullSalary} = this.state

    const {baseINSS,discountINSS,baseIRPF,discountIRPF,netSalary} = calculateSalaryFrom(fullSalary)

    this.setState({
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary
    })

    console.log(this.state)
  };

  render() {
    const { fullSalary,baseINSS,discountINSS,baseIRPF,discountIRPF,netSalary } = this.state;

    return (
      <>
        <ProjetoBase
          value={fullSalary}
          labelName={"Salário Bruto"}
          input={this.handleSalaryInput}
        ></ProjetoBase>

        <ProjetoBase disabled={true} value={baseINSS} labelName={"Base INSS"}></ProjetoBase>
        <ProjetoBase disabled={true} value={discountINSS} labelName={"Desconto INSS"}></ProjetoBase>
        <ProjetoBase disabled={true} value={baseIRPF} labelName={"Base IRPF"}></ProjetoBase>
        <ProjetoBase disabled={true} value={discountIRPF} labelName={"Desconto IRPF"}></ProjetoBase>
        <ProjetoBase
          disabled={true}
          value={netSalary}
          labelName={"Salário Líquido"}
        ></ProjetoBase>
      </>
    );
  }
}
