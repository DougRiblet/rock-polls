const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
let port = process.env.PORT || 8357;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

// // SCHEMA

// var boilerSchema = mongoose.Schema({
//   // define schema here
// });

// var Boiler = mongoose.model('Boiler', boilerSchema);



app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(200);
});

app.use(function (req, res, next) {
  res.status(404).send('Error 404');
});



app.listen(port, function () {
  console.log('App listening on port ' + port);
});
