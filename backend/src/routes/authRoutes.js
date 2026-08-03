import express from "express";
import { register, login, logout, me } from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, me); // returns the current user, or 401

export default router;
