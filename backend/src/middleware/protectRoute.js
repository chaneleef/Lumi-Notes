import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../lib/token.js";

// Guards routes that require a logged-in user.
// Reads the JWT from the httpOnly cookie, verifies it, and attaches req.userId.
const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Session expired or invalid. Please log in again." });
  }
};

export default protectRoute;
