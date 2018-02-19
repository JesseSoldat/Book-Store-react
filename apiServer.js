"use strict"
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const Book = require('./models/book.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// APIs
// const db = mongoose.connection;
const db = mongoose.connect('mongodb://localhost:27017/bookshop');

// db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// --->>> SET UP SESSIONS <<<----

//---->>> POST BOOK <<<-----
app.post('/books', (req, res) => {
  const book = req.body;
  Book.create(book, (err, book) => {
    if(err) { throw err; }
    res.json(book);
  });
});

//----->>>> GET BOOKS <<<---------
app.get('/books', (req, res) => {
  Book.find((err, books) => {
    if(err) { throw err; }
    console.log(books);
    
    res.json(books)
  });
});

//---->>> DELETE BOOKS <<<------
app.delete('/books/:_id', (req, res) => {
  const query = {_id: req.params._id};

  Book.remove(query, (err, book) => {
    if(err) { console.log('API Delete', err);}
    res.json(book);
  });
});


//---->>> UPDATE BOOKS <<<------
app.put('/books/:_id', (req, res) => {
  const book = req.body;
  const query = req.param._id;
  const update = {
    '$set': {
      title: book.title,
      description: book.description,
      price: book.price
    }
  }
  const options = {new: true};
  Book.findOneAndUpdate(query, update, options, (err, book) => {
    if(err) { throw err; }
    res.json(book);
  });
});


// END APIs
app.listen(3001, (err) => {
  if(err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});