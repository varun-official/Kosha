/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvathar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setName, setAvathar } = activateSlice.actions;

export default activateSlice.reducer;
