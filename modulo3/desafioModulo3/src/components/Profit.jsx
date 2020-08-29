import React from "react";

export default function Profit({ profit }) {
  const {value,formated} = profit;
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
  

  return (
  <div style={styleDiv}>{value > 0 ? `+  ${formated}` : `${formated}`}</div>
  )
}
