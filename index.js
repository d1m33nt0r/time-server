const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/cupforcetime.pp.ua/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cupforcetime.pp.ua/fullchain.pem')
};

app.get('/', (req, res) => {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  res.json({ unixTimestamp });
});

https.createServer(options, app).listen(443, () => {
    console.log('Server running on https://cupforcetime.pp.ua');
});