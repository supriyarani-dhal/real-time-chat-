import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const server = http.createServer(app);
//create a socket.io server
const io = new Server(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

//handle incoming connections
//socket.on() is used to listen to the events on both the client and server side

let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  //it creates a room (setup) for the user to enter that room
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //it's for joining of the user to that room(or chat)
  socket.on("join chat", (room) => {
    socket.join(room);
  });

  //for typing functionality inside the room(a chat)
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  //
  socket.on("new message", (newMesageReceived) => {
    var chat = newMesageReceived.chat;

    if (!chat.users) return console.log("chat.users are not defined");

    chat.users.forEach((user) => {
      if (user._id === newMesageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMesageReceived);
    });
  });

  //tracks the user online or offline
  socket.on("userOnline", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("updateUserStatus", { userId, status: "online" });
  });

  //to disconnect the socket
  socket.on("disconnect", () => {
    let disconnectedUserId = null;
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        onlineUsers.delete(userId);
        break;
      }
    }
    if (disconnectedUserId) {
      io.emit("updateUserStatus", {
        userId: disconnectedUserId,
        status: "offline",
      });
    }
    console.log("A user disconnected", socket.id);
  });

  // socket.off("setup", () => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData._id);
  // });
});

dotenv.config();
connectDB();

//some middlewares to tell the server for accepting JSON data from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

//---------deployment-----------------------------

const __dirname = path.resolve(); //the _dirname1 is my current working directory

//establish a path from _dirname1 to the dist folder
app.use(express.static(path.join(__dirname, "/frontend/dist"))); //the static method is used to serve the static files

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//----------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

server.listen(
  process.env.PORT || 5000,
  console.log(
    `App is listening on http://localhost:${process.env.PORT}`.yellow.bold
  )
);

// const io = new WebSocketServer({ server });

// io(server, {
//   pingTimeOut: 60000,
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });
