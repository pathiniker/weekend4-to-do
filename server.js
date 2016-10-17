var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var toDo = require('./routes/to_do');
// var connectionString = 'postgres://localhost:3000/(location)'

// npm install -g nodemon
// nodemon server.js

// app.use(boderParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/to_do', toDo);

// serve the index page at /
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});


var server = app.listen(3000, function () {
  console.log('Listening on port ', server.address().port);
});
