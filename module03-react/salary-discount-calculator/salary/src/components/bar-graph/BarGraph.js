import React from "react";

export default function BarGraph({ value, color = "var(--gray)" }) {
  return (
    <div
      style={{
        marginTop: "40px",
        width: value + "%",
        height: "20px",
        backgroundColor: color,
      }}
    />
  );
}
