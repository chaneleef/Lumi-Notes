import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { setAuthCookie, clearAuthCookie } from "../lib/token.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shape the user object we send back — NEVER include the password hash.
const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
    });

    setAuthCookie(res, user._id);
    res.status(201).json(publicUser(user));
  } catch (error) {
    console.error("Error in register controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // Same generic message whether the email or the password is wrong,
    // so we don't reveal which emails have accounts.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    setAuthCookie(res, user._id);
    res.status(200).json(publicUser(user));
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function logout(_req, res) {
  clearAuthCookie(res);
  res.status(200).json({ message: "Logged out." });
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(publicUser(user));
  } catch (error) {
    console.error("Error in me controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
