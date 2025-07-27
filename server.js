const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.get("/", (req, res) => res.send("WebSocket Server is running"));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🔌 Connected:", socket.id);

  socket.on("join", (name) => {
    console.log("🎮 Join:", name);
    io.emit("user-joined", { id: socket.id, name });
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
    io.emit("user-left", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🚀 Listening on", PORT);
});
