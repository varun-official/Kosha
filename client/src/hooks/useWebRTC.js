/** @format */

import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC = () => {
  const [clients, setClients] = useStateWithCallback([
    {
      id: 1,
      name: "Varun",
    },
    {
      id: 2,
      name: "Vivek",
    },
  ])

  return {clients}
};
