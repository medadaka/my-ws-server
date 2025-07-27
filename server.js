const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// CORS設定（開発中は * でOK、本番ではドメイン制限推奨）
app.use(cors());
app.get("/", (req, res) => res.send("WebSocket Server is running"));

const io = new Server(server, {
  cors: {
    origin: "*",  // ここも本番では絞るのが安全です
    methods: ["GET", "POST"]
  }
});

// ソケットイベント
io.on("connection", (socket) => {
  console.log("接続:", socket.id);

  socket.on("join", (name) => {
    console.log("参加:", name);
    io.emit("user-joined", { id: socket.id, name });
  });

  socket.on("disconnect", () => {
    console.log("切断:", socket.id);
    io.emit("user-left", socket.id);
  });
});

// RailwayやRenderではPORT環境変数が必須
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocketサーバー起動中: ポート ${PORT}`);
});
