import React from "react";

export default function Input({ step, labelName, input, value }) {
  return (
    <div className="input-field col s4">
      <input
        value={value}
        id="first_name2"
        type="number"
        className="validate"
        onChange={input}
        step={step}
      />
      <label className="active" for="first_name2">
        {labelName}
      </label>
    </div>
  );
}
