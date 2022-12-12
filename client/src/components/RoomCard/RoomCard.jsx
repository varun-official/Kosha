/** @format */

import React from "react";
import styles from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/room/${room.id}`)} className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div
        className={`${styles.spekers} ${
          room.speakers.length === 1 ? styles.oneSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers?.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt="speaker" />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers?.map((speaker) => (
            <div key={speaker.id} className={styles.nameWraper}>
              <span>{speaker.name}</span>
              <img src="/images/chat-bubble.png" alt="chat-bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.participants}>
        <span>{room.participants ? room.participants : 0}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
