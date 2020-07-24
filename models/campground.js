var mongoose = require("mongoose"),
	Comment = require("../models/comment")

var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comment: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//delete associated comments when detroying
campgroundSchema.pre('remove', async (next)=>{
	try{
		await Comment.remove({
			"_id": {
				$in: this.comments
			}
		});
		next();
	}catch(err){
		next(err);
	}
});

module.exports = mongoose.model("Campground", campgroundSchema);
