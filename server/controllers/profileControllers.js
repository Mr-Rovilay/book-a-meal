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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
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

// get
const uploadUrl = (req, res) => {
  generateUploadURL()
    .then((url) => res.status(200).json({ uploadURL: url }))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ err: err.message });
    });
};

const updateProfileUrl = (req, res) => {
  let { url } = req.body;
  User.findOneAndUpdate({ _id: req.user }, { profile_img: url })
    .then(() => {
      return res.status(200).json({ profile_img: url });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

const getProfile = async (req, res) => {
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
};

const updateProfile = (req, res) => {
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
};

export default {
  uploadUrl,
  updateProfileUrl,
  getProfile,
  updateProfile,
};
