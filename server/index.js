import express from "express";
import "./db/db.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import menuRoute from "./routes/menuRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRoute from "./routes/userRoute.js";
import verifyJWT from "./middleware/verifyJWT.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
console.log(process.env.SECRET_ACCESS_KEY);

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// import route
app.use("/router", authRoute);
app.use("/menu", menuRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);

app.get("/", verifyJWT, (req, res) => {
  res.send("OK...my message");
});

app.listen(process.env.PORT, () =>
  console.log("server listening on port " + process.env.PORT)
);
