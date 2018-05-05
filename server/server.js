const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const signin = require('./auth/signin');
const signup = require('./auth/signup');

const app = express();
let port = process.env.PORT || 8357;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE

let User = require('./models/user');
let uri;
if(!process.env.MONGODB_URI){
  uri = require( './uri' ).uri;
} else {
  uri = process.env.MONGODB_URI;
}

mongoose.Promise = Promise;

mongoose.connect(uri)
  .then(() => {
    console.log('Mongoose connection established');
  })
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// ROUTES

app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/auth/signin', signin);

app.use('/auth/signup', signup);

app.use(function (req, res, next) {
  res.status(404).send('Error 404');
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
