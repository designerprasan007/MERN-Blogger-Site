const express = require('express');

const {getPrivateData} = require('../middleware/Private');
const {ProfileView} = require('../controller/ProfileController');

const views = express.Router();


views.get('/profile', getPrivateData, ProfileView)



module.exports = views;