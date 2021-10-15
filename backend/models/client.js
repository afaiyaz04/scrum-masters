import mongoose from "mongoose";

// define the Client schema
const clientSchema = new mongoose.Schema({
    nameFirst: { type: String, required: true },
    nameLast: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    fav: { type: Boolean, required: true, default: false },
    profilePic: { type: String, required: false }
});

// compile into Model
const Client = mongoose.model("Client", clientSchema);

export default Client;
