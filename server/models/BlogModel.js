const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
	title: String,
	content: String,
	blogpic: [
		{
			type: String
		}
	],
	adminid: String,
	tags:[
		{
			type: String
		}
	],
	created:{
		type: Date,
		default : Date.Now
	},
})

const Blog = mongoose.model('blog', BlogSchema);


module.exports = Blog