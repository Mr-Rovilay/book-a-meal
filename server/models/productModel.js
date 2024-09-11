// Assuming you are using Mongoose for MongoDB object modeling
import mongoose from "mongoose"

// Define the Product schema
const productSchema = new mongoose.Schema({
  // Add your product fields here
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  image: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
