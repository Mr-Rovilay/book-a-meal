import express from "express";
import "./db/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "./Schema/User.js";
import Menus from "./Schema/Menu.js";
import aws from "aws-sdk";
import { nanoid } from "nanoid";
const app = express();
import { ObjectId } from "mongodb";

import authRoute from "./routes/authRoute.js";
import Carts from "./Schema/Carts.js";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "No access token or unauthorized" });
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

// get single user
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user by their ID from the database
    const user = await User.findById(id);

    if (!user) {
      // If no user found with the provided ID, return 404 Not Found
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user as JSON response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

// Define route to delete a single user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the user by their ID from the database
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      // If no user found with the provided ID, return 404 Not Found
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

app.get("/users/admin/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    const isAdmin = user.role === "admin";

    // Return admin status
    res.status(200).json({ isAdmin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

// route to get all users
app.get("/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({});
    res.status(200).json(users); // Return the list of users as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

// get admin
// Define route to get admin status based on email
// app.get("/admin/:email", async (req, res) => {
//   const email = req.params.email;

//   try {
//     // Query for the user with the provided email
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the user has the role of admin
//     const isAdmin = user.role === "admin";

//     if (!isAdmin) {
//       return res.status(403).json({ message: "Forbidden user" });
//     }

//     // Return admin status
//     res.status(200).json({ isAdmin: isAdmin });
//   } catch (error) {
//     console.error("Error checking admin status:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Define route to make a user an admin
app.patch("/users/admin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role to "admin"
    user.role = "admin";
    await user.save();

    // Return success message
    res.status(200).json({ message: "User has been made an admin" });
  } catch (error) {
    console.error("Error making user an admin:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

// import route
app.use("/router", authRoute);

// get all menus
app.get("/menu", async (req, res) => {
  try {
    const menus = await Menus.find({});
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get single menu
// Define route to get a single menu item by ID
app.get("/menus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the menu item by its ID from the database
    const menuItem = await Menus.findById(id);

    if (!menuItem) {
      // If no menu item found with the provided ID, return 404 Not Found
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Return the menu item as JSON response
    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

// Route to get cart items by username
app.get("/carts/:username", verifyJWT, async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch cart items based on username
    const cartItems = await Carts.find({ username });

    // If cart is found, send it as response
    if (cartItems) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Define route to delete a user by ID
// app.delete("/users/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Find the user by their ID and delete it
//     await User.findByIdAndDelete(userId);

//     // Return success message
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: "Internal server error" }); // Handle errors
//   }
// });

// get all cart using username
app.get("/carts", verifyJWT, async (req, res) => {
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

// create carts
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

// update carts quentity
app.put("/carts/:id", async (req, res) => {
  const { id } = req.params; // Correctly extracting id from req.params
  const { quantity } = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };

  const updateDoc = {
    $set: {
      quantity: parseInt(quantity, 10),
    },
  };

  try {
    const result = await Carts.updateOne(filter, updateDoc, options);
    res
      .status(200)
      .json({ success: true, message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("OK...my message");
});

app.listen(process.env.PORT, () =>
  console.log("server listening on port " + process.env.PORT)
);
