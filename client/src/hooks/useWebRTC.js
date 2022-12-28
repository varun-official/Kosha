/** @format */

import { useEffect, useCallback, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import socketInit from "../socket";
import freeice from "freeice";
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

  const addNewClient = useCallback(
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
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStreams.current;
        }

        //socket emit JOIN socket io
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });
  }, []);

  useEffect(() => {
    const handelNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      //if already connected then give warning
      if (peerId in connections.current) {
        return console.warn(
          `you are already connected with ${peerId}(${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      //handel new ice candidate
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emmit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      //handel on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // Add local strack to remote connection
      localMediaStreams.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStreams.current);
      });

      // Create offer
      if (createOffer){
        const offer = await connections.current[peerId].createOffer()

        //send offer to another client
        socket.current.emit(ACTIONS.RELAY_SDP,{
          peerId,
          sessionDescription: offer
        })
      }
    };

    

    socket.current.on(ACTIONS.ADD_PEER, handelNewPeer);

    return ()=>{
      socket.current.off(ACTIONS.ADD_PEER);
    }
  }, []);

  return { clients, provideRef };
};
