//<!--book.js, Leticia Lopez, 301087698, midterm-->
let express = require('express');
let router = express.Router();
//let mongoose = require('mongoose'); //v3

//let jwt = require('jsonwebtoken'); //v3

// create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', 
            {title: 'Books', 
            BookList: bookList, 
           });      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book', 
    })          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "title": req.body.title, //v2
        "description": req.body.description, //v2
        "price": req.body.price, //v2
        "author": req.body.author, //not modif
        "genre": req.body.genre //v2
        
    });
    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit, 
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBook = Book({
        "_id": id,
        "title": req.body.title, //v2
        "description": req.body.description, //v2
        "price": req.body.price, //v2
        "author": req.body.author, //not modified
        "genre": req.body.genre //v2 
    });
    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/books');
        }
    });
}