const express = require('express');
const multer  = require('multer');
const {getPrivateData} = require('../middleware/Private');
const {InsertBlog, GetUsersAllBlog, EditBlog, DeleteBlog} = require('../controller/BlogController');
const {BlogComments, CreateComment,EditComment, DeleteComment} = require('../controller/CommentController');

const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './BlogImg');
    },
    filename: (req, file, cb) => {
        console.log(file);
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


blogs.post('/newblog', getPrivateData, upload.any('blogimg'),  InsertBlog);
blogs.get('/adminblogs', getPrivateData, GetUsersAllBlog);
blogs.put('/editblog', getPrivateData, upload.array('blogimg', 3), EditBlog);
blogs.delete('/deleteblog', getPrivateData, DeleteBlog);


blogs.post('/comment',  BlogComments);
blogs.post('/storeComment', getPrivateData, CreateComment);
blogs.put('/editComment', getPrivateData, EditComment);
blogs.post('/deleteComment', getPrivateData, DeleteComment);



module.exports = blogs;

