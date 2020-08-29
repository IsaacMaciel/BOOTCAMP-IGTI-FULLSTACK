import React from "react";

export default function Amount({ amount }) {
  const {value,formated} = amount;

  let styleDiv = null;

  if (value < 0) {
      styleDiv = {
          color: "#c0392b"
      }
  } else {
      styleDiv = {
          color: "#2ecc71"
      }
  } 

  return <div style={styleDiv}>{formated}</div>;
}
