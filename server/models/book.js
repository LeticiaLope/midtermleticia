//<!--book.js, Leticia Lopez, 301087698, midterm-->
let mongoose = require('mongoose');

//create a model class
let bookModel = mongoose.Schema({
    title: String, //v2
    description: String, //v2
    price: Number, //v2
    author: String, //not modified
    genre: String //v2

},
{
    collection: "books"
});

module.exports = mongoose.model('Book', bookModel);

