import mongoose from "mongoose";

// define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

// compile into Model
const Product = mongoose.model("Product", productSchema);

export default Product;
