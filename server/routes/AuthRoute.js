const express = require('express');
const {LoginUser, RegisterUser} = require('../controller/AuthController');

const routes = express.Router();


routes.post('/login', LoginUser) 
routes.post('/register', RegisterUser)

module.exports = routes;