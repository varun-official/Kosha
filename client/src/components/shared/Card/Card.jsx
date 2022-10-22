/** @format */

import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img src={`/images/${icon}.png`} alt="logo" />
        <h2 className={styles.heading}>{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default Card;
