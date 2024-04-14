import jwt from "jsonwebtoken";
import User from "../Schema/User.js";

const verifyAdmin = async (req, res, next) => {
  try {
    // Extract username from decoded JWT token
    const username = req.decoded.username;

    // Query the database for the user with the extracted username
    const user = await User.findOne({ username });

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if user is an admin
    const isAdmin = user?.role === "admin";

    // If user is not an admin, return 403 Forbidden
    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden access" });
    }

    // If user is admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in verifyAdminByUsername middleware:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export default verifyAdmin;
