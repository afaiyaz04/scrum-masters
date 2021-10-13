import mongoose from "mongoose";

const { CONTRACT_CONFIRMED, CONTRACT_FULFILLED } = require("./systemEnums");

// define the Contract schema
const contractSchema = new mongoose.Schema({
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Order",
    required: true,
  },
  timePlaced: { type: Date, default: Date.now },
  timeDue: { type: Date, required: true },
  feeAgreed: { type: Number, required: true },
  status: {
    type: String,
    enum: [CONTRACT_CONFIRMED, CONTRACT_FULFILLED],
    default: CONTRACT_CONFIRMED,
    required: true,
  },
  description: { type: String, required: false, default: null },
});

// compile into Model
const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
