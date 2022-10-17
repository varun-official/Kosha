/** @format */

import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import kosha from "../../../assets/kosha.png";

const Navbar = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src={kosha} className={styles.logo} alt="logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
