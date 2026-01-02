import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: null,
  otherUserData: null,
  selectedUser: null,
  socket:null,
  onlineUsers:null
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
        setSocket: (state, action) => {
      state.socket = action.payload;
    },
        setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    clearSelectedUser:(state)=>{
      state.selectedUser = null;
    }
  },
});
export const { setUserData, logout, setOtherUser, setSelectedUser,clearSelectedUser,setSocket,setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
