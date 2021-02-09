const express = require('express');
const morgan = require('morgan');

const app = express();
const routes = require('./routes/AuthRoute');
const database = require('./config/Database');

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', routes);

const PORT = 4500;

app.listen(PORT, () =>{
	database();
	console.log(`app listening on port ${PORT}`)
})
