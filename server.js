const express = require('express');
const https = require('https');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
//const host = process.env.HOST || 'localhost';
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
}); 



https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('');
  }, app).listen(port, () => 
  console.log(`Server started on port ${port}`)
);