const express = require('express');
const {LoginUser, RegisterUser, LogoutUser, UpdateUser} = require('../controller/AuthController');
// const {destroyToken} = require('../middleware/Private');
const multer  = require('multer');

const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './ProfilePic');
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


const routes = express.Router();



routes.post('/login', LoginUser);
routes.post('/register', RegisterUser);
routes.post('/userupdate', upload.single('profilepic'), UpdateUser)
// routes.post('/logout', destroyToken, LogoutUser);

module.exports = routes;