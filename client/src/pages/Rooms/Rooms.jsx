/** @format */

import React, { useState, useEffect, useRef } from "react";
import AddRoomModal from "../../components/AddRoom/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import { getAllRooms } from "../../http/index";
import Loader from "../../components/shared/Loader/Loader";
const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const featchRooms = async () => {
      // setRooms([]);
      const { data } = await getAllRooms();
      console.log(data);
      setRooms(data);
    };
    featchRooms();
  }, []);
  // const rooms = [
  //   {
  //     id: 1,
  //     topic: "room1",
  //     spekers: [
  //       {
  //         id: 1,
  //         name: "varun",
  //         avatar: "/images/monkey-avatar.png",
  //       },
  //       {
  //         id: 2,
  //         name: "vivek",
  //         avatar: "/images/monkey-avatar.png",
  //       },
  //     ],
  //     participants: 20,
  //   },
  //   {
  //     id: 2,
  //     topic: "room2",
  //     spekers: [
  //       {
  //         id: 1,
  //         name: "varun",
  //         avatar: "/images/monkey-avatar.png",
  //       },
  //     ],
  //     participants: 200,
  //   },
  //   {
  //     id: 3,
  //     topic: "room3",
  //     spekers: [
  //       {
  //         id: 1,
  //         name: "varun",
  //         avatar: "/images/monkey-avatar.png",
  //       },
  //       {
  //         id: 2,
  //         name: "vivek",
  //         avatar: "/images/monkey-avatar.png",
  //       },
  //     ],
  //     participants: 200,
  //   },
  //   {
  //     id: 4,
  //     topic: "room4",
  //     spekers: [
  //       {
  //         id: 1,
  //         name: "varun",
  //         avatar: "/images/monkey-avatar.png",
  //       },
  //     ],
  //     participants: 10,
  //   },
  // ];

  const openModal = () => {
    setShowModal(true);
  };

  if (!rooms) return <Loader />;

  return (
    <>
      <div className="container">
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startButton}>
              <img src="/images/add-room-icon.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {rooms && rooms.map((room) => <RoomCard room={room} key={room.id} />)}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Rooms;
