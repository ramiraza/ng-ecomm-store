import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: Array(String),
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
