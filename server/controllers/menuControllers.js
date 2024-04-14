import Menus from "../Schema/Menu.js";

// get all menu
const getAllMenu = async (req, res) => {
  try {
    const menus = await Menus.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post all menu
const postMenu = async (req, res) => {
  try {
    const newMenu = await Menus.create(req.body);
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define route to get a single menu item by ID
const getSingleMenu = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the menu item by its ID from the database
    const menuItem = await Menus.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
};

const deletedMenuItem = async (req, res) => {
  try {
    const { id } = req.params.id;
    const menus = await Menus.deleteOne(id);

    if (!menus) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.status(200).send({ message: "Item deleted successfully", menus });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting item", error: error.message });
  }
};
const updateMenu = async (req, res) => {
  const id = req.params.id;
  const { name, recipe, image, category, price } = req.body;
  try {
    // Find the menu item by ID and update it
    const updatedMenu = await Menus.findByIdAndUpdate(
      id,
      { name, recipe, image, category, price },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating item", error: error.message });
  }
};

export default {
  getAllMenu,
  postMenu,
  getSingleMenu,
  deletedMenuItem,
  updateMenu,
};
