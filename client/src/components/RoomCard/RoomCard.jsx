/** @format */

import React from "react";
import styles from "./RoomCard.module.css";

const RoomCard = ({ room }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={styles.spekers}>
        <div className={styles.avatars}>
          {room?.spekers.map((speaker) => (
            <img src={speaker.avatar} alt="speaker" />
          ))}
        </div>
        <div className={styles.names}>
          {room?.spekers.map((speaker) => (
            <div className={styles.nameWraper}>
              <span>{speaker.name}</span>
              <img src="/images/chat-bubble.png" alt="chat-bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.participants}>
        <span>{room.participants}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
