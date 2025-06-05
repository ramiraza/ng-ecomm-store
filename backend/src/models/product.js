import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  shortDescription: String,
  purchasePrice: Number,
  salePrice: Number,
  images: Array(String),
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
