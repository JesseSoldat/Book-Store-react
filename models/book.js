"use strict"
const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;