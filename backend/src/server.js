import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // allow the browser to send/receive the auth cookie
  })
); // allow the frontend dev server to call the API
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(cookieParser()); // parse cookies -> req.cookies (auth token)
app.use(rateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    });
});
