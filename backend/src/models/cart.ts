import mongoose, { Schema, Types } from 'mongoose';

const cartSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  products: Array(String),
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
