/** @format */

import { useState } from "react";

export const useWebRTC = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Varun",
    },
    {
      id: 2,
      name: "Vivek",
    },
  ]);

  return {clients}
};
