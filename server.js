const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json({ strict: false, limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('listen on 3000')
})