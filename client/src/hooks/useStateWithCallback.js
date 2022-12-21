/** @format */

import { useEffect } from "react";
import { useRef } from "react";
import { useCallback, useState } from "react";

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef;
  const updateState = useCallback(
    (newState, cb) => {
      cbRef.current = cb;

      setState((prev) => {
        return typeof newState === "function" ? newState(prev) : newState;
      });
    },
    [state]
  );

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, []);

  return [state, updateState];
};
