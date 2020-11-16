import React from "react";
import style from "./header.module.css";

// Header just holds the main title of the app
// for that we are going to use {children} instead of props
export default function Header({ children }) {
  return <h1>{children}</h1>;
}
