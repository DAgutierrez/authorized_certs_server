var fs = require('fs'); 
var https = require('https'); 

var options = { 
    hostname: 'localhost', 
    port: 4433, 
    path: '/', 
    method: 'GET', 
    key: fs.readFileSync('certs/client1-key.pem'), 
    cert: fs.readFileSync('certs/client1-crt.pem'), 
    ca: fs.readFileSync('certs/ca-crt.pem') 
}; 

var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        console.log('data', data.toString())
    }); 
}); 
req.end();