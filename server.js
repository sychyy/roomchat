const WebSocket = require('ws');
const express = require('express');
const app = express();
const http = require('http').Server(app);

// Membuat WebSocket server
const wss = new WebSocket.Server({ server: http });

wss.on('connection', function connection(ws) {
  console.log('A new user connected');
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('Welcome to the WebSocket server!');
});

// Menyediakan berkas index.html di route utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Menjalankan server pada port 3000
http.listen(3000, () => {
  console.log('Server started on port 3000');
});
