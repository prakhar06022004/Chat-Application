import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

export const userSocketMap = {};
export const getReceiverSocketId = (receiver)=>{
  return userSocketMap[receiver]
}
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    console.log("User connected:", userId);
    userSocketMap[userId] = socket.id;
  }

  // ✅ send updated online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 🔹 TYPING INDICATOR EVENTS
socket.on("typing", (receiverId) => {
  const receiverSocketId = userSocketMap[receiverId];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("typing");
  }
});

socket.on("stopTyping", (receiverId) => {
  const receiverSocketId = userSocketMap[receiverId];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("stopTyping");
  }
});

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);

    // 🔑 remove correct userId
    for (const id in userSocketMap) {
      if (userSocketMap[id] === socket.id) {
        delete userSocketMap[id];
        break;
      }
    }

    // ✅ emit updated list again
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
