import mongoose from "mongoose";

// define the Client schema
const clientSchema = new mongoose.Schema({
    nameFirst: { type: String, required: true },
    nameLast: { type: String, required: true },
    title: { type: String, required: false },
    company: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    fav: { type: Boolean, required: true, default: false },
    profilePic: { type: String, required: false },
});

// compile into Model
const Client = mongoose.model("Client", clientSchema);

export default Client;
