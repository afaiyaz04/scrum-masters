const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
		required: true,
	},
    user: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
    },
    timeCreated: { type: Date, required: true, default: Date.now },
    text: { type: String, required: true }
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
