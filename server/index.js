const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const routes = require('./routes/AuthRoute');
const views = require('./routes/ViewRoute'); 
const database = require('./config/Database');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', routes);
app.use('/api/views', views)

const PORT = 4500;

app.listen(PORT, () =>{
	database();
	console.log(`app listening on port ${PORT}`)
})
