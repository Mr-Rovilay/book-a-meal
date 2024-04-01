import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  username: {
    type: String,
    true: true,
    required: true,
  },
});

export default mongoose.model("carts", cartSchema);
