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

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for email
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameNotUnique = await User.exists({
    username: username,
  }).then((result) => result);

  isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
  return username;
};
// format data
export const formatDataToSend = (user) => {
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
