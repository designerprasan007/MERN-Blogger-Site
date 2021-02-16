const express = require('express');
const {InsertBlog} = require('../controller/BlogController');
const blogs = express.Router();


blogs.get('/newblog', InsertBlog);


module.exports = blogs;

