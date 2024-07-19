import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "authSlice",
  initialState: { currentUser: null },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = authSlice.actions;
