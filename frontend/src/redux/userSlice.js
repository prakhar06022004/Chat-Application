import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: null,
  otherUserData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    logout: () => {
      return initialState;
    },

    setOtherUser: (state, action) => {
      state.otherUserData = action.payload;
    },
  },
});
export const { setUserData, logout, setOtherUser } = userSlice.actions;
export default userSlice.reducer;
