import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {type: Array, required: true},
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Food Processing'
  },
  address: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  payment: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // Automatically handles `createdAt` and `updatedAt`.

const Order = mongoose.model('Order', orderSchema);

export default Order;
