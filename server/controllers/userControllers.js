import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email" })
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ error: "Email already exist" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashedPassword })
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(201).json({ email, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}