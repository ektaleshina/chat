const chat = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

socket.onmessage = function(event) {
};

sendButton.addEventListener('click', function() {
    const message = messageInput.value;
    if (message) {
        chat.innerHTML += `<div>Вы: ${message}</div>`;
        socket.send(message);
        messageInput.value = '';
    }
});

locationButton.addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locationLink = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;
            chat.innerHTML += `<div>Вы: <a href="${locationLink}" target="_blank">Моя гео-локация</a></div>`;
            socket.send(`Гео-локация: ${locationLink}`);
        });
    } else {
        alert("Гео-локация не поддерживается.");
    }
});
