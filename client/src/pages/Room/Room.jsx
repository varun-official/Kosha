/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useWebRTC } from "../../hooks/useWebRTC";
import styles from "./Room.module.css";

const Room = () => {
  const {id: roomId}  = useParams();
  const user = useSelector(state => state.auth.user)
  const { clients } = useWebRTC(roomId,user);
  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map((client) => {
        return (
          <div key={client.id}>
            <audio controls autoplay></audio>
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
