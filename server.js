const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';
const uri = 'mongodb://localhost:27017/twerk';
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(`Not connected to the database ${err}`);
    } else {
        console.log('SUCCESS: Connected to MongoDB.')
    }
});

http.createServer((req, res) => {
    res.writeHead(200, app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    }) );
    res.end();
  }), app.listen(port, host, () => 
  console.log(`App started on port https://${host}:${port}`)
);