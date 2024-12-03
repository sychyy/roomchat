// Connect to the socket server
const socket = io();

// DOM elements
const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message');
const chatBox = document.getElementById('chat-box');
const roomCodeDisplay = document.getElementById('room-code-display');
const airDiv = document.getElementById('air');

// State variables
let currentRoomCode = '';

// Create room handler
createRoomBtn.addEventListener('click', () => {
    socket.emit('create-room', (roomCode) => {
        currentRoomCode = roomCode;
        document.getElementById('create-room').style.display = 'none';
        document.getElementById('chat-room').style.display = 'block';
        roomCodeDisplay.textContent = roomCode;
    });
});

// Join room handler
joinRoomBtn.addEventListener('click', () => {
    const roomCode = document.getElementById('room-code').value;
    socket.emit('join-room', roomCode);
    currentRoomCode = roomCode;
    document.getElementById('join-room').style.display = 'none';
    document.getElementById('chat-room').style.display = 'block';
    roomCodeDisplay.textContent = roomCode;
});

// Send message handler
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit('send-message', { roomCode: currentRoomCode, message });
        messageInput.value = '';
    }
});

// Update chat box
socket.on('receive-message', (data) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = data.message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
});

// Update air color every hour
setInterval(() => {
    const now = new Date();
    const lastMessageTime = new Date(localStorage.getItem('lastMessageTime'));
    const diff = now - lastMessageTime;

    if (diff <= 60 * 60 * 1000) {
        airDiv.style.backgroundColor = 'blue'; // Blue air if within 1 hour
    } else {
        airDiv.style.backgroundColor = 'gray'; // Gray air after 1 hour
    }
}, 60000);

// Listen for room joined event
socket.on('room-joined', () => {
    localStorage.setItem('lastMessageTime', new Date().toISOString()); // Set the last message time
});
