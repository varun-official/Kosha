/** @format */

import React from "react";
import styles from "./AddRoom.module.css";
import Textinput from "../shared/Textinput/Textinput";

const AddRoom = () => {
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <Textinput fullWidth="true" />
          <h2 className={styles.subHeading}>Room Types</h2>
          <div className={styles.roomTypes}>
            <div className={styles.typeBox}>
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div className={styles.typeBox}>
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div className={styles.typeBox}>
              <img src="/images/lock.png" alt="lock" />
              <span>Lock</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Let's Go </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
