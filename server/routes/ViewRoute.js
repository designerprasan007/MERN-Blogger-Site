const express = require('express');

const {getPrivateData} = require('../middleware/Private');
const {ProfileView, getAllUsers} = require('../controller/ProfileController');

const views = express.Router();


views.get('/profile', getPrivateData, ProfileView)


views.get('/users', getAllUsers);

module.exports = views;