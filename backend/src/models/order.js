import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  orderDate: Date,
  items: Array(any),
  status: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
