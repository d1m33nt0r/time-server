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


app.get('/get-time', (req, res) => {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  res.json({ unixTimestamp });
});


app.get('/privacy-policy', (req, res) => {
    const filePath = './privacy-policy.txt';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading privacy-policy.txt file:', err);
            res.status(500).send('Error reading privacy-policy.txt file');
        } else {
            res.type('text/plain');
            res.send(data);
        }
    });
});

app.get('/app-ads.txt', (req, res) => {
    const filePath = './app-ads.txt';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading app-ads.txt file:', err);
            res.status(500).send('Error reading app-ads.txt file');
        } else {
            res.type('text/plain');
            res.send(data);
        }
    });
});