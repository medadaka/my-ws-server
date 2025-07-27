const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Railwayでは、ポート番号は環境変数で設定される
const port = process.env.PORT || 3000; // 環境変数が設定されていなければ3000を使用

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  ws.send('Hello, client!');
});

// Railway環境では自動的にポートが設定されるので、環境変数を利用
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
