const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const fs = require('fs');
const required = require('express-required-fields')

const app = express();

app.use(bodyParser.json({ strict: false, limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('Authorized certs');
});

const createRequiredFields = ['id', 'rut', 'firstName','lastName','secondLastName','pep','gender', 'dateOfBirth', 'nationality', 'phone', 'residenceCountry', 'address', 'city', 'commune', 'postalCode', 'maritalStatus', 'occupation', 'degree' ]
app.post('/api/client', required(createRequiredFields), (req, res) => {
    let response = req.body;
    response.onboardStatus = 'pending';
    response.createdAt = new Date();;
    response.updatedAt = new Date();

    res.json(response);
});

var options = {
    key: fs.readFileSync('certs/server-key.pem'), 
    cert: fs.readFileSync('certs/server-crt.pem'), 
    ca: fs.readFileSync('certs/ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: true
}; 

https.createServer(options, app).listen(4433, () => {
    console.log('listen 4433')
})