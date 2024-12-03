const createRoomBtn = document.getElementById('createRoomBtn');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const roomCodeInput = document.getElementById('roomCode');
const messagesDiv = document.getElementById('messages');
const waterDiv = document.getElementById('water');

let socket;
let roomCode = '';
let lastMessageTime = Date.now();
let streakTimer;

createRoomBtn.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoom);
sendBtn.addEventListener('click', sendMessage);

function createRoom() {
  roomCode = generateRoomCode();
  alert(`Room created! Share this code: ${roomCode}`);
  connectToRoom(roomCode);
}

function joinRoom() {
  roomCode = roomCodeInput.value;
  if (roomCode) {
    connectToRoom(roomCode);
  } else {
    alert('Please enter a room code!');
  }
}

function connectToRoom(code) {
  socket = new WebSocket(`ws://localhost:3000/${code}`);
  socket.onopen = () => {
    document.querySelector('.create-join').style.display = 'none';
    document.querySelector('.chat-box').style.display = 'block';
    startStreak();
  };
  socket.onmessage = (event) => {
    const message = event.data;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    updateStreak();
  };
}

function sendMessage() {
  const message = messageInput.value;
  if (message && socket) {
    socket.send(message);
    messageInput.value = '';
    updateStreak();
  }
}

function updateStreak() {
  lastMessageTime = Date.now();
  clearTimeout(streakTimer);
  streakTimer = setTimeout(() => {
    waterDiv.style.backgroundColor = '#ccc'; // Grey if inactive
  }, 3600000); // 1 hour
  waterDiv.style.backgroundColor = '#3498db'; // Blue if active
}

function startStreak() {
  streakTimer = setTimeout(() => {
    waterDiv.style.backgroundColor = '#ccc'; // Grey if inactive
  }, 3600000); // 1 hour
}

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6); // Generates a random 6 character code
}
