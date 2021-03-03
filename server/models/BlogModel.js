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
		required: true,
        default: Date.now
	},
	likes:[{
		likerId:{
			type: ObjectId,
			ref: 'user',
		}  
	}],
	comments:[{
		commenterId:{
			type: ObjectId,
			ref: 'user',
		},
		comment: String,	
		date:{
			type: Date,
			required: true,
       		default: Date.now
		}
	}]

}
// {
// 	timeStamps: true
// }
)

const Blog = mongoose.model('blog', BlogSchema);


module.exports = Blog