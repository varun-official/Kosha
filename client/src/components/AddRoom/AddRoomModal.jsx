/** @format */

import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import { useNavigate } from "react-router-dom";
import Textinput from "../shared/Textinput/Textinput";
import { createRoom as createRoomOnServer } from "../../http/index";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  const navigate = useNavigate()

  const createRoom = async () => {
    try {
      if (!topic) return;
      const { data } = await createRoomOnServer({ topic, roomType });
      navigate(`/room/${data.id}`)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <Textinput
            fullWidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room Types</h2>
          <div className={styles.roomTypes}>
            <div
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
              onClick={() => setRoomType("open")}
            >
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
              onClick={() => setRoomType("social")}
            >
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
              onClick={() => setRoomType("private")}
            >
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Let's Go </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
