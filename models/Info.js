

var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	ident: {
		required: true,
		unique: true,
		type:String
	},
	name:String,
	characterName:String,
	playerRace:String,
	playerClass:String,
	strength:Number,
	dexterity:Number,
	intelligence:Number,
	wisdom:Number,
	charisma:Number



});

var Info = mongoose.model("Info", infoSchema);

module.exports = Info;



