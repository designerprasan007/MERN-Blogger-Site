const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const routes = require('./routes/AuthRoute');
const views = require('./routes/ViewRoute');
const blogs  = require('./routes/BlogRoute')
const database = require('./config/Database');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', routes);
app.use('/api/views', views);
app.use('/api/blogs', blogs)

app.use(express.static(path.join(__dirname, 'ProfilePic')));
app.use(express.static(path.join(__dirname, 'BlogImg')));


const PORT = 4500;

app.listen(PORT, () =>{
	database();
	console.log(`app listening on port ${PORT}`)
})
