/** @format */

import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const HomePage = () => {
  const signinLiskStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const navigate = useNavigate();

  const ButtonClickHandler = async () => {
    navigate("/register");
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Kosha!" icon="logo">
        <p className={styles.text}>
          We’re working hard to get Kosha ready for everyone! While we wrap up
          the finishing youches, we’re adding people gradually to make sure
          nothing breaks
        </p>
        <div>
          <Button onClick={ButtonClickHandler} text="Get your userName" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          <Link style={signinLiskStyle} to="/authenticate">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
