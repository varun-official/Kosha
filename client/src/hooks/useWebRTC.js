/** @format */

import { useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
const users = [
  {
    id: 1,
    name: "Varun",
  },
  {
    id: 2,
    name: "Vivek",
  },
];
export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback(users);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStreams = useRef(null);

  return { clients };
};
