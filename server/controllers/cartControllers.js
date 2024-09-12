import User from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    // Find the user by the provided userId
    const userData = await User.findOne({ _id: req.body.userId });

    // Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {};

    // Check if the item is already in the cart, if not set it to 1, otherwise increment by 1
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    // Update the user's cartData
    await User.findByIdAndUpdate(req.body.userId, { cartData });

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Item added to cart" });
  } catch (error) {
    // Handle any errors and return a 500 response with the error message
    return res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    // Find the user by the provided userId
    const userData = await User.findOne({ _id: req.body.userId });

    // Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get the current cartData
    let cartData = userData.cartData || {};

    // Check if the item exists in the cart
    if (cartData[req.body.itemId]) {
      // Decrement the item count by 1
      cartData[req.body.itemId] -= 1;

      // If the count becomes 0 or less, remove the item from the cart
      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId];
      }

      // Update the user's cartData
      await User.findByIdAndUpdate(req.body.userId, { cartData });

      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Item removed from cart" });
    } else {
      // If the item doesn't exist in the cart, return an error
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    // Handle any errors and return a 500 response with the error message
    return res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};
export const getCart = async (req, res) => {
  try {
    // Find the user by the provided userId
    const userData = await User.findById({ _id: req.body.userId });

    // Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get the current cartData
    let cartData = userData.cartData || {};

    // Return the cart data
    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    // Handle any errors and return a 500 response with the error message
    return res
      .status(500)
      .json({ message: "Error fetching cart data", error: error.message });
  }
};
