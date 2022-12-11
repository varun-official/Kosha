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
  const { isAuth, user } = useSelector((state) => state.auth);
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
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>

          <Link to="/">
            <img
              src={user.avatar ? user.avatar : "./images/monkey-avatar.png"}
              className={styles.avatar}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>

          <button className={styles.logout} onClick={logoutUser}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
