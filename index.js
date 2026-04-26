const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '8334973590:AAEFg_GY0xVI2n2pvI1aUw2ePs0ow8ncCXs'; 
const bot = new TelegramBot(token, {polling: true});

const app = express();
const port = process.env.PORT || 3000;

let statusKunci = false;

// Ini adalah API yang akan ditembak oleh HP Android
app.get('/status', (req, res) => {
    res.json({ kunci: statusKunci });
});

// Kalau kamu buka halaman depan webnya, cuma muncul teks ini (bukan blog lagi)
app.get('/', (req, res) => {
    res.send("👑 Server Pemantau King Haidar Aktif!");
});

app.listen(port, () => {
    console.log(`Server API berjalan di port ${port}`);
});

// Logika Telegram Bot
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👑 Panel Kontrol Belajar Yuk\n\n/kunci - Kunci HP\n/buka - Buka HP\n/status - Cek Status");
});

bot.onText(/\/kunci/, (msg) => {
    statusKunci = true;
    bot.sendMessage(msg.chat.id, "🔒 HP target akan terkunci dalam beberapa detik.");
});

bot.onText(/\/buka/, (msg) => {
    statusKunci = false;
    bot.sendMessage(msg.chat.id, "🔓 Kunci HP target telah dilepas.");
});

bot.onText(/\/status/, (msg) => {
    const state = statusKunci ? "TERKUNCI 🔒" : "BEBAS 🔓";
    bot.sendMessage(msg.chat.id, `Status: *${state}*`, {parse_mode: "Markdown"});
});
