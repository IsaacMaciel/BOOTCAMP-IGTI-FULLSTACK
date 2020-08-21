import React from "react";

const STARS = {
  empty: "☆",
  full: "★",
};

const MAX_STARS = 10;

export default function Popularity({ value }) {
  const fullStarts = STARS.full.repeat(value);
  const emptyStarts = STARS.empty.repeat(MAX_STARS - value);

  return (
    <div style={{fontSize:'1.5rem',color:'#f39c12'}}>
      {fullStarts}
      {emptyStarts}
    </div>
  );
}
