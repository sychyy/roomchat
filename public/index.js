// Menggunakan WebSocket untuk server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });  // WebSocket server berjalan di port 8080

wss.on('connection', (ws) => {
  console.log("A client has connected");

  ws.on('message', (message) => {
    console.log('Received: %s', message);

    // Kirim pesan ke semua klien yang terhubung
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log("A client has disconnected");
  });
});

// Menampilkan URL WebSocket server
console.log('WebSocket server running at ws://localhost:8080');
