let socket = new WebSocket("ws://35ccffc0-0dc6-4539-9e1e-69f0dd5b673e-00-q40aqvfv8b43.pike.replit.dev:8080");  // Ganti dengan URL WebSocket dari Replit
let sendButton = document.getElementById("send");
let messageInput = document.getElementById("message");
let chatBox = document.getElementById("chat-box");
let streak = document.getElementById("streak");

let lastMessageTime = Date.now();
let streakActive = false;

socket.onopen = () => {
  console.log("Connected to WebSocket");
};

socket.onmessage = (event) => {
  let msg = event.data;
  let messageElement = document.createElement("p");
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
};

sendButton.onclick = () => {
  let message = messageInput.value;
  if (message) {
    socket.send(message);
    let messageElement = document.createElement("p");
    messageElement.textContent = `You: ${message}`;
    chatBox.appendChild(messageElement);
    messageInput.value = "";
    checkStreak();
  }
};

function checkStreak() {
  let currentTime = Date.now();
  let timeDifference = currentTime - lastMessageTime;

  if (timeDifference >= 3600000) {  // 1 hour in milliseconds
    streak.classList.add("active");
    streakActive = true;
  } else {
    streak.classList.remove("active");
    streakActive = false;
  }

  lastMessageTime = currentTime;
}
