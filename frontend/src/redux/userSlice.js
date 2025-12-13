import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUserData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
    setOtherUser: (state, action) => {
      state.otherUserData = action.payload;
    },
  },
});
export const { setUserData, logout, setOtherUser } = userSlice.actions;
export default userSlice.reducer; 
