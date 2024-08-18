// script.js
function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatContent = document.getElementById('chat-content');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<p>${userInput}</p>`;
    chatContent.appendChild(userMessage);

    // Send the user input to the server
    fetch('/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `<p>${data.reply}</p>`;
        chatContent.appendChild(botMessage);
        chatContent.scrollTop = chatContent.scrollHeight;
    })
    .catch(error => {
        console.error('ERROR:', error);
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `<p>Terjadi kesalahan.</p>`;
        chatContent.appendChild(botMessage);
        chatContent.scrollTop = chatContent.scrollHeight;
    });

    document.getElementById('user-input').value = '';
}
