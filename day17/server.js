import app from "./src/app.js"
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("new connection added")

  socket.on('connected', (msg)=> {
    console.log("user message")
    console.log(msg)
    io.emmit('abc', "hello from server")
  })
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})