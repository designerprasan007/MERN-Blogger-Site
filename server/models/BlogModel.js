const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types

const BlogSchema = new mongoose.Schema({
	title: String,
	content: String,
	blogpic: [
		{
			type: String
		}
	],
	adminid: {
		type: ObjectId,
		ref:'user'
	},
	tags: String,
	created:{
		type: Date,
		default : new Date()
	},
	likes:[{
		type: ObjectId,
		ref: 'user',  
	}],
	comments:[{
		commenterId:{
			type: ObjectId,
			ref: 'user',
		},
		comment: String,	
		date:{
			type: Date,
			default : new Date()
		}
	}]

})

const Blog = mongoose.model('blog', BlogSchema);


module.exports = Blog