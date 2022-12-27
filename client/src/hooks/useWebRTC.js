/** @format */

import { useEffect, useCallback, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import socketInit from "../socket";
import { ACTIONS } from "../actions";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStreams = useRef(null);
  const socket = useRef(null);
  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  const addNewClients = useCallback(
    (newClients, cb) => {
      const lookingFor = clients.find((client) => client.id === newClients.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClients], cb);
      }
    },
    [clients, setClients]
  );

  //capture media

  useEffect(() => {
    const startCapture = async () => {
      localMediaStreams.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClients(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStreams.current;
        }

        //socket emit JOIN socket io
        socket.current.emit(ACTIONS.JOIN, {});
      });
    });
  }, []);

  return { clients, provideRef };
};
