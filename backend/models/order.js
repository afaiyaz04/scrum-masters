const mongoose = require("mongoose");
const {
	ORDER_PENDING,
	ORDER_CONFIRMED,
	ORDER_FULFILLED,
} = require("./systemEnums");

// define the ProductItem child schema
const lineProductSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: { type: Number, default: 1, required: true },
	},
	{ _id: false }
);

// define the Order schema
const orderSchema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: true,
	},
	lineProducts: { type: [lineProductSchema], required: true },
	timePlaced: { type: Date, required: true, default: Date.now },
	timeDue: { type: Date, required: true },
	totalFee: { type: Number, required: true },
	status: {
		type: String,
		enum: [
			ORDER_PENDING,
			ORDER_CONFIRMED,
			ORDER_FULFILLED,
		],
		default: ORDER_PENDING,
		required: true,
	},
	description: { type: String, required: false, default: null },
});

// compile into Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
