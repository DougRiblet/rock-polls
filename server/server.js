var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// MONGOOSE 

if(!process.env.MONGODB_URI){
  var uri = require( './uri' ).uri;
} else {
  var uri = process.env.MONGODB_URI;
}

mongoose.Promise = require('bluebird');

mongoose.connect(uri)
  .then(() => {
    console.log('Mongoose connection established');
  })
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// SCHEMA

var boilerSchema = mongoose.Schema({
  // define schema here
});

var Boiler = mongoose.model('Boiler', boilerSchema);

// ENDPOINTS

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// put CRUD endpoints here

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(200);
});

app.use(function (req, res, next) {
  res.status(404).send('Error 404');
});

// SERVER

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
