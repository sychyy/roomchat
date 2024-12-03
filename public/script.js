// WebSocket untuk komunikasi real-time
const socket = new WebSocket('wss://35ccffc0-0dc6-4539-9e1e-69f0dd5b673e-00-q40aqvfv8b43.pike.replit.dev/');

// Fungsi untuk membuat room baru
function createRoom() {
    const roomCode = Math.random().toString(36).substring(2, 8); // Membuat kode room acak
    window.location.href = `/room/${roomCode}`; // Mengarahkan ke room baru
}

// Fungsi untuk bergabung ke room
function joinRoom() {
    const roomCode = document.getElementById('roomCode').value;
    if (roomCode) {
        window.location.href = `/room/${roomCode}`; // Arahkan ke room yang diinginkan
    } else {
        alert('Masukkan kode room yang valid!');
    }
}

// Fungsi untuk mengirim pesan
function sendMessage() {
    const message = document.getElementById('messageInput').value;
    socket.send(message); // Mengirim pesan melalui WebSocket
}

// Fungsi untuk menerima pesan
socket.onmessage = function(event) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `<p>${event.data}</p>`; // Menampilkan pesan baru di chat
};

// Fungsi untuk mengubah status air berdasarkan waktu chatting
function updateWaterStreak() {
    const currentTime = new Date().getHours();
    const streakElement = document.getElementById('streak');
    if (currentTime % 2 === 0) { // Cek apakah waktu chatting di dalam interval tertentu
        streakElement.style.backgroundColor = 'blue'; // Air berwarna biru jika chatting terus
    } else {
        streakElement.style.backgroundColor = 'gray'; // Air berwarna abu-abu jika tidak ada chat
    }
}

// Set interval untuk update streak setiap 1 jam
setInterval(updateWaterStreak, 3600000); // Update setiap jam
