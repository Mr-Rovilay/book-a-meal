import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "No access token or unauthorized" });
  }
  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Access token is invalid" });
    }
    req.decoded = decoded;
    next();
  });
};
export default verifyJWT;
