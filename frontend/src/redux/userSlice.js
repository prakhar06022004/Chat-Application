import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: null,
  otherUserData: null,
  selectedUser: null,
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
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser:(state)=>{
      state.selectedUser = null;
    }
  },
});
export const { setUserData, logout, setOtherUser, setSelectedUser,clearSelectedUser } =
  userSlice.actions;
export default userSlice.reducer;
