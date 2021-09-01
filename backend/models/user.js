const mongoose = require("mongoose");
const {
	ADMIN_USER,
	GENERAL_USER,
} = require("./systemEnums");

// define the User schema
const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	nameFirst: { type: String, required: true },
	nameLast: { type: String, required: true },
	type: {
		type: String,
		enum: [
			ADMIN_USER,
			GENERAL_USER,
		],
		required: true,
	},
});

// compile into Model
const User = mongoose.model("User", userSchema);

module.exports = User;
