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

const OnlineUsersMap = {};
//putting online user if u get one
// export function getReceiveSocketId(userId) {
// return UserOnline.get(userId);
// }
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) OnlineUsersMap[userId] = socket.id;
  //broadcast type of
  io.emit("OnlineUsers", Object.keys(OnlineUsersMap));
  socket.on("disconnect", () => {
    console.log(`user disconnect : ${socket.id}`);
    const sockets = OnlineUsersMap.get(userId);
    if (!sockets) return;

    sockets.delete(socket.id);

    if (sockets.size === 0) {
      OnlineUsersMap.delete(userId);
    }
    io.emit("Online Users", Object.keys(OnlineUsersMap));
  });
});

//exporting things
export { io, server, app };
