const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rooms = {}; // Store rooms and their messages

// Serve static files from the public directory
app.use(express.static('public'));

// When a user creates a room
io.on('connection', (socket) => {
    socket.on('create-room', (callback) => {
        const roomCode = Math.random().toString(36).substr(2, 6); // Generate a random room code
        rooms[roomCode] = [];
        callback(roomCode);
    });

    // When a user joins a room
    socket.on('join-room', (roomCode) => {
        if (rooms[roomCode]) {
            socket.join(roomCode);
            io.to(roomCode).emit('room-joined');
        } else {
            socket.emit('error', 'Room not found');
        }
    });

    // When a user sends a message
    socket.on('send-message', (data) => {
        const { roomCode, message } = data;
        if (rooms[roomCode]) {
            rooms[roomCode].push(message);
            io.to(roomCode).emit('receive-message', { message });
        }
    });

    socket.on('disconnect', () => {});
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
