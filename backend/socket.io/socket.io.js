import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
io.on("connection",(socket)=>{
  // console.log(socket.id)
  io.emit("hello","hello prakhar")
})

export { app, server,io };
