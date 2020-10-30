//<!--index.js, Leticia Lopez, 301087698, midterm-->
let express = require('express');
let router = express.Router();
//let mongoose = require('mongoose'); v3
//let passport = require('passport');v3

// enable jwt
//let jwt = require('jsonwebtoken'); //v3
//let DB = require('../config/db'); //v3|

module.exports.displayHomePage = (req, res, next) => {
    res.render('pages/home', {title: 'Home'/*, displayName: req.user ? req.user.displayName : ''*/});
}
