require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const loginCheck = require('./middleware/login-check');
const signin = require('./auth/signin');
const signup = require('./auth/signup');
const createPoll = require('./crud/create-poll');

const app = express();
const port = process.env.PORT || 8357;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE

mongoose.Promise = Promise;

/* eslint-disable no-console */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongoose connection established');
  })
  .catch((err) => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });
/* eslint-enable no-console */

// ROUTES

app.use(express.static(path.join(__dirname, '../client/public')));

app.post('/auth/signin', signin);

app.post('/auth/signup', signup);

app.post('/poll/create', loginCheck, createPoll);

app.use((req, res) => {
  res.status(404).send('Error 404');
});

/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
/* eslint-enable no-console */
