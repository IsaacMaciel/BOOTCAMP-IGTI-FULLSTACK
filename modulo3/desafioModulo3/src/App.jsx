import React, { useState, useEffect } from "react";

import jurosComposto from "./helpers/jurosComposto";
import Input from "./components/Input";
import Card from "./components/Card";

export default function App() {
  const [amount, setAmount] = useState(1000);
  const [juros, setJuros] = useState(3);
  const [month, setMonth] = useState(5);
  const [result, setResult] = useState([]);

  const callback = (amount, juros, month) => {
    if (amount && juros && month) {
      return jurosComposto(amount, juros, month);
    }
    return;
  };

  useEffect(() => {
    setResult(callback(amount, juros, month));
  }, [amount, juros, month]);

  return (
    <div>
      <Input
        labelName="Montante Inicial"
        value={amount}
        step={100}
        input={(e) => setAmount(+e.target.value)}
      />
      <Input
        labelName="Juros"
        value={juros}
        step={0.1}
        input={(e) => setJuros(+e.target.value)}
      />
      <Input
        labelName="Meses"
        value={month}
        step={1}
        input={(e) => setMonth(+e.target.value)}
      />

      <Card result={result} />
    </div>
  );
}
