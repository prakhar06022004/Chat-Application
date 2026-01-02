// redux/messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // 🔁 replace (chat open)
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // ➕ append (new msg)
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setMessages, addMessage, clearMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
