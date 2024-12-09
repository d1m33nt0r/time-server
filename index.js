const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

// Завантажуємо сертифікат
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/gamerstash.pp.ua/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/gamerstash.pp.ua/fullchain.pem"),
};

// Маршрут для отримання часу
app.get("/", (req, res) => {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  res.json({ unixTimestamp });
});

// Запускаємо HTTPS сервер
https.createServer(options, app).listen(443, () => {
  console.log("HTTPS сервер запущено на порті 443");
});
