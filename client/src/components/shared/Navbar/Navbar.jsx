/** @format */

import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import kosha from "../../../assets/kosha.png";
import { logout } from "../../../http";
import { setAuth } from "../../../store/AuthSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src={kosha} className={styles.logo} alt="logo" />
      </Link>
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};

export default Navbar;
