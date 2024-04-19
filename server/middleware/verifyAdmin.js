import User from "../Schema/User.js";

const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.decoded || !req.decoded.email) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const email = req.decoded.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isAdmin = user?.role === "admin";
    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    next();
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export default verifyAdmin;
