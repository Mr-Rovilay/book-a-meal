import Carts from "../models/Carts.js";

const getCartByUsername = async (req, res) => {
  try {
    const { email } = req.params;
    const cartItems = await Carts.find({ email });
    if (cartItems) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get all cart using username
const getAllCart = async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "email parameter is missing" });
  }
  try {
    const result = await Carts.find({ email: email });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// create carts
const addToCart = async (req, res) => {
  const cartItemData = req.body;
  try {
    const newItem = await Carts.create(cartItemData);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error inserting document into collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// DELETE endpoint to delete an item by ID
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params.id;
    const carts = await Carts.deleteOne(id);

    if (!carts) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.status(200).send({ message: "Item deleted successfully", carts });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting item", error: error.message });
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (isNaN(quantity) || parseInt(quantity, 10) < 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid quantity" });
  }
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      quantity: parseInt(quantity, 10),
    },
  };
  try {
    const result = await Carts.updateOne(filter, updateDoc);
    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get cart by id
const getSingleCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Carts.findById(id);
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching cart", error: error.message });
  }
};

const deleteAllCart = async (req, res) => {
  const { cartIds } = req.body;
  try {
    const deleteResult = await Carts.deleteMany({ _id: { $in: cartIds } });
    console.log("Deleted cart items:", deleteResult);
    res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getCartByUsername,
  getAllCart,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
  deleteAllCart,
};
