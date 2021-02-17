const express = require('express');
const multer  = require('multer');
const {getPrivateData} = require('../middleware/Private');
const {InsertBlog, GetUsersAllBlog, EditBlog} = require('../controller/BlogController');


const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './BlogImg');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

const blogs = express.Router();


blogs.post('/newblog', getPrivateData, upload.array('blogimg', 3),  InsertBlog);
blogs.get('/userblog', getPrivateData, GetUsersAllBlog);
blogs.put('/editblog', getPrivateData, upload.array('blogimg', 3), EditBlog);

module.exports = blogs;

