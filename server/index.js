import express from "express";
import "./db/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "./Schema/User.js";
import Menus from "./Schema/Menu.js";
import aws from "aws-sdk";
import { nanoid } from "nanoid";
const app = express();

import authRoute from "./routes/authRoute.js";
import Carts from "./Schema/Carts.js";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "No access token" });
  }
  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Access token is invalid" });
    }
    req.user = user.id;
    next();
  });
};

//upload img to a aws

const s3 = new aws.S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const generateUploadURL = async () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

  return await s3.getSignedUrlPromise("putObject", {
    Bucket: "book-a-meal",
    Key: imageName,
    Expires: 1000,
    ContentType: "image/jpeg",
  });
};

app.get("/get-upload-url", (req, res) => {
  generateUploadURL()
    .then((url) => res.status(200).json({ uploadURL: url }))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ err: err.message });
    });
});

app.post("/update-profile-img", verifyJWT, (req, res) => {
  let { url } = req.body;
  User.findOneAndUpdate({ _id: req.user }, { "personal_info.profile_img": url })
    .then(() => {
      return res.status(200).json({ profile_img: url });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

app.post("/get-profile", async (req, res) => {
  let { username } = req.body;
  User.findOne({ "personal_info.username": username })
    .select("-personal_info.password -google_auth -updatedAt -address")
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});

app.post("/update-profile", verifyJWT, (req, res) => {
  let { username, address, social_links } = req.body;
  let addressLimit = 100;

  if (username.length < 3) {
    return res
      .status(403)
      .json({ error: "Username should be at least 3 letters long" });
  }
  if (address.length > addressLimit) {
    return res.status(403).json({
      error: `Address should not be more than ${addressLimit} characters`,
    });
  }

  let socialLinks = Object.keys(social_links);
  try {
    for (let i = 0; i < socialLinks.length; i++) {
      if (social_links[socialLinks[i]]) {
        // Check if the link exists
        try {
          let url = new URL(social_links[socialLinks[i]]);
          if (url.protocol !== "https:" || !url.hostname) {
            throw new Error("Invalid URL format");
          }
          // Additional checks if needed
        } catch (error) {
          return res.status(403).json({
            error: `${socialLinks[i]} link is invalid. You must enter full links with 'https://' included`,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while validating social links",
    });
  }

  let UpdateObj = {
    "personal_info.username": username,
    "personal_info.address": address,
    social_links,
  };
  User.findOneAndUpdate({ _id: req.user }, UpdateObj, {
    runValidators: true,
  })
    .then(() => {
      return res.status(200).json({
        username,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({
          error: "username is already taken",
        });
      } else {
        return res.status(500).json({ error: err.message });
      }
    });
});

// import route
app.use("/router", authRoute);

app.get("/menu", async (req, res) => {
  try {
    const menus = await Menus.find({});
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get cart using username
app.get("/carts", async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: "Username parameter is missing" });
  }
  try {
    const result = await Carts.find({ username: username });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/carts", async (req, res) => {
  const cartItemData = req.body;
  try {
    const newItem = await Carts.create(cartItemData);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error inserting document into collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get cart
app.get("/carts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find cart by its unique ID
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
});

// delete items from carts
// DELETE endpoint to delete an item by ID
app.delete("/carts/:id", async (req, res) => {
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
});

app.get("/", (req, res) => {
  res.send("OK...my message");
});

app.listen(process.env.PORT, () =>
  console.log("server listening on port " + process.env.PORT)
);
