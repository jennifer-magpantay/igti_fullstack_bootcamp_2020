import React from "react";
import style from './header.module.css'

export default function Header({ children }) {
  return <div className={style.header}>{children}</div>;
}
