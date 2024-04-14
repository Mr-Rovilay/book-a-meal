import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";
import aws from "aws-sdk";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccountKey from "../book-a-meal-72459-firebase-adminsdk-csmsb-08ab87b617.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express();
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ limit: "50mb" }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameNotUnique = await User.exists({
    username: username,
  }).then((result) => result);

  isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

// format data
const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_ACCESS_KEY
  );
  return {
    access_token,
    profile_img: user.profile_img,
    address: user.address,
    email: user.email,
    role: user.role,
    id: user._id,
    username: user.username,
    fullname: user.fullname,
  };
};

router.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 characters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter email address" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "invalid email address" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "password should be 6 to 20 characters long with numeric, 1 lowercase and 1 uppercase letter",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email);
    let user = new User({
      fullname,
      email,
      password: hashed_password,
      username,
    });
    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({ error: "email already exists" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
});

router.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not found" });
      }

      if (!user.google_auth) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(403).json({
              error: "Error occur while login in please try again",
            });
          }

          if (!result) {
            return res.status(403).json({ error: "incorrect password" });
          } else {
            return res.status(200).json(formatDataToSend(user));
          }
        });
      } else {
        return res.status(403).json({
          error: "Account was created using google. Try Logging in with google",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

// google_auth
router.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;
  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;
      picture = picture.replace("s96-c", "s384-c");
      let user = await User.findOne({ email: email })
        .select("fullname username profile_img google_auth")
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              "This email was signed up without google. please login with password to access the account",
          });
        }
      } else {
        let username = await generateUsername(email);
        user = new User({
          fullname: name,
          email,
          username,
          google_auth: true,
        });

        await user
          .save()
          .then((u) => {
            user = u;
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
      return res.status(200).json(formatDataToSend(user));
    })
    .catch((err) => {
      return res.status(500).json({
        error:
          "Failed to authenticate you with google. Try with another google account",
      });
    });
});

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

router.get("/get-upload-url", (req, res) => {
  generateUploadURL()
    .then((url) => res.status(200).json({ uploadURL: url }))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ err: err.message });
    });
});

router.post("/update-profile-img", verifyJWT, (req, res) => {
  let { url } = req.body;
  User.findOneAndUpdate({ _id: req.user }, { profile_img: url })
    .then(() => {
      return res.status(200).json({ profile_img: url });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

router.post("/get-profile", async (req, res) => {
  let { username } = req.body;
  User.findOne({ username: username })
    .select("-password -google_auth -updatedAt")
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});

router.post("/update-profile", verifyJWT, (req, res) => {
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
    username: username,
    address: address,
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

export default router;
