const mongoose = require('mongoose');


const Database = async () =>{
	try {
		mongoose.connect('mongodb+srv://Codebug:Codebug@123@cluster0.ytxpu.mongodb.net/mernBlog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
		console.log("mongo connected");
	} catch(e) {
		// statements
		console.log(e);
		}
	}


module.exports = Database;

 