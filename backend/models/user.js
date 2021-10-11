import mongoose from 'mongoose';

import {
	ADMIN_USER,
	GENERAL_USER
} from './systemEnums.js';

// define the User schema
const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	oauthId: { type: String, required: false },
	nameFirst: { type: String, required: false },
	nameLast: { type: String, required: false },
	type: {
		type: String,
		enum: [
			ADMIN_USER,
			GENERAL_USER,
		],
		default: GENERAL_USER,
		required: true,
	},
	clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
	contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],
	report: { type: mongoose.Schema.Types.ObjectId, ref: "Report" }
});

// compile into Model
const User = mongoose.model("User", userSchema);

export default User;
