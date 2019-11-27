const bodyParser = require('body-parser');
const express = require('express');
var https = require('https');
const fs = require('fs');

const app = express();

app.use(bodyParser.json({ strict: false, limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('hello world');
});

var options = { 
    key: fs.readFileSync('certs/server-key.pem'), 
    cert: fs.readFileSync('certs/server-crt.pem'), 
    ca: fs.readFileSync('certs/ca-crt.pem'), 
}; 

https.createServer(options, app).listen(4433, () => {
    console.log('listen 4433')
})