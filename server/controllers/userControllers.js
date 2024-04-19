import User from "../models/User.js";

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// get single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the user by their ID from the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
};
// Define route to delete a single user by ID verifyJWT, verifyAdmin,
const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the user by their ID from the database
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
};
// get users admin with email
// const getUserAdmin = async (req, res) => {
//   const { email } = req.email;
//   try {
//     const user = await User.findOne(email);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isAdmin = user.role == "admin";
//     res.status(200).json({ isAdmin });
//   } catch (error) {
//     console.error("Error checking admin status:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const getAdmin = async (req, res) => {
  const email = req.params.email; // Assuming you're using something like Express and username is a URL parameter
  const query = { email: email };

  try {
    const user = await User.findOne(query); // Find the user by username

    // Assuming you're using some form of authentication middleware that decodes the token
    // and assuming the decoded token contains the username of the requester
    if (email !== req.decoded.email) {
      return res.status(403).json({ message: "Forbidden access" });
    }

    let isAdmin = false;
    if (user) {
      isAdmin = user.role === "admin"; // Check if the user role is 'admin'
    }
    res.status(200).json({ isAdmin }); // Respond with the isAdmin flag
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors that occur during the operation
  }
};

// Define route to make a user an admin verifyJWT, verifyAdmin,
const makeUserAnAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user's role to "admin"
    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "User has been made an admin" });
  } catch (error) {
    console.error("Error making user an admin:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
};

export default {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  // getUserAdmin,
  makeUserAnAdmin,
  getAdmin,
};
