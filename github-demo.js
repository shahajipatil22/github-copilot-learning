// write a function that takes in a string and returns the string reversed
// "hello" => "olleh"
// "goodbye" => "eybdoog"
// "I like to eat food" => "doof tae ot ekil I"
// "The quick brown fox jumps over the lazy dog" => "god yzal eht revo spmuj xof nworb kciuq ehT"

var reverseString = function(string) {
  var newString = "";
  for (var i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString;
};

// Path: jquery-demo.js
// write a function that takes in a string and returns the string reversed
// "hello" => "olleh"
// "goodbye" => "eybdoog"
// "I like to eat food" => "doof tae ot ekil I"
// "The quick brown fox jumps over the lazy dog" => "god yzal eht revo spmuj xof nworb kciuq ehT"

var reverseString = function(string) {
  var newString = "";
  for (var i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString;
};

// Path: node-demo.js
// write a function that takes in a string and returns the string reversed
// "hello" => "olleh"
// "goodbye" => "eybdoog"
// "I like to eat food" => "doof tae ot ekil I"
// "The quick brown fox jumps over the lazy dog" => "god yzal eht revo spmuj xof nworb kciuq ehT"

var reverseString = function(string) {
  var newString = "";
  for (var i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString;
};

// Path: react-demo.js
// write a function that takes in a string and returns the string reversed
// "hello" => "olleh"
// "goodbye" => "eybdoog"
// "I like to eat food" => "doof tae ot ekil I"
// "The quick brown fox jumps over the lazy dog" => "god yzal

// Return the current time
var getTime = function() {
  return new Date();
};


// find all images without alternate text
// and give them a red border
var findImagesWithoutAltText = function() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        if (!images[i].alt) {
        images[i].style.border = "1px solid red";
        }
    }
  }


    // Express server on port 3000
    var express = require('express');
    var app = express();
    var port = 3000;

    // start server
    app.listen(port, function() {
      console.log('app started');
    }


    async function addBook(params){
      const book = await Book.create(params);
      return book;

    }

    // edit a book record by id
    async function editBook(id, params){
      const book = await getBook(id);
      Object.assign(book, params);
      await book.save();

      return book;
    }

    // delete a book record by id

    async function deleteBook(id){
      const book = await getBook(id);
      await book.destroy();
    }

    // get a book record by id
    async function getBook(id){
      const book = await Book.findByPk(id);
      if (!book) throw 'Book not found';
      return book;
    }
    