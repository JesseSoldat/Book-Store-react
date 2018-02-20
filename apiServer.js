"use strict"
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Book = require('./models/book.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// APIs
mongoose.connect('mongodb://localhost:27017/bookshop');
const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// --->>> SET UP SESSIONS <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));
// SAVE SESSION CART API
app.post('/cart', (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if(err) { throw err; }
    res.json(req.session.cart);
  });
});

//---->>> POST BOOK <<<-----
app.post('/books', (req, res) => {
  const book = req.body;
  Book.create(book, (err, book) => {
    if(err) { throw err; }
    res.json(book);
  });
});

// GET SESSION CART API
app.get('/cart', (req, res) => {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

//----->>>> GET BOOKS <<<---------
app.get('/books', (req, res) => {
  Book.find((err, books) => {
    if(err) { throw err; }
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


// --->>> GET BOOKS IMAGES API <<<------
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');
  
  fs.readdir(imgFolder, (err, files) => {
    if(err) return console.log(err);
    const filesArray = [];
    files.forEach(file => {
      if(file.match(/^\s*?\..*$/)) {
        // console.log('Matched', file);
        return;
      }
      filesArray.push({name: file});
    });
      res.json(filesArray);
  });
});


// END APIs
app.listen(3001, (err) => {
  if(err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});