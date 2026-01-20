import { Server } from "socket.io";
import http from "http";
import express from "express";
// basic express app
const app = express();
const server = http.createServer(app);
//online User stay place

// for cors
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const OnlineUsersMap = new Map();
//putting online user if u get one
// export function getReceiveSocketId(userId) {
// return UserOnline.get(userId);
// }

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) OnlineUsersMap.set(userId, socket.id);
  //broadcast type of
  io.emit("OnlineUsers", Array.from(OnlineUsersMap.keys()));
  socket.on("disconnect", () => {
    console.log(`user disconnect : ${socket.id}`);
    OnlineUsersMap.delete(userId);
    io.emit("OnlineUsers", Array.from(OnlineUsersMap.keys()));
  });
});

//exporting things
export const getReceiveSocketId = (userId) => {
  return OnlineUsersMap.get(userId);
};
export { io, server, app };
