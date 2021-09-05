const mongoose = require("mongoose");

// define the report schema
const reportSchema = new mongoose.Schema({
    numOfContract: { type: Number, required: true },
    TotalFee: { type: Number, required: true },
    Detail: { type: String, required: true },
});

// compile into Model
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
