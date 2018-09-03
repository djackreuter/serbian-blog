require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').MONGODB_URI;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Could not connect to database', err));

app.get('/', (req, res) => {
  res.send('Testing');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));