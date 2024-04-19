import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
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
import {
  emailRegex,
  formatDataToSend,
  generateUsername,
  passwordRegex,
} from "../utils/helpers.js";
import { getToken } from "../utils/jwt.js";

// post
const signUp = async (req, res) => {
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
};

// post
const SignIn = async (req, res) => {
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
};

// google_auth post
const googleAuth = async (req, res) => {
  let { access_token } = req.body;
  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;
      picture = picture.replace("s96-c", "s384-c");
      let user = await User.findOne({ email: email })
        .select("fullname username email profile_img google_auth")
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
};

export default {
  googleAuth,
  SignIn,
  signUp,
};
