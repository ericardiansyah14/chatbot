// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Define a simple pattern-based response system
const responses = [
    { keyword: 'halo', response: 'Halo! Ada yang bisa saya bantu?' },
    { keyword: 'siapa namamu', response: 'Saya adalah chatbot sederhana.' },
    { keyword: 'terima kasih', response: 'Sama-sama!' },
    { keyword: 'selamat tinggal', response: 'Selamat tinggal! Semoga hari Anda menyenangkan.' },
    { keyword: 'bagaimana kabarmu', response: 'Saya baik-baik saja, terima kasih!' },
    { keyword: 'berapa usia kamu', response: 'Saya tidak memiliki usia karena saya adalah chatbot.' }
];

// Function to handle message processing
function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase().trim();
    for (const item of responses) {
        if (lowerCaseMessage.includes(item.keyword)) {
            return item.response;
        }
    }
    return 'Maaf, saya tidak mengerti pertanyaan Anda.';
}

app.post('/message', (req, res) => {
    const { text } = req.body;
    const response = getResponse(text);
    res.json({ reply: response });
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
