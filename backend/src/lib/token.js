import jwt from "jsonwebtoken";

const COOKIE_NAME = "token";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

// Sign a JWT for the user and set it as a secure, httpOnly cookie.
// httpOnly => JavaScript on the page cannot read the token (protects against XSS theft).
export const setAuthCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd, // only sent over HTTPS in production
    sameSite: isProd ? "none" : "lax", // "none" needed for cross-site prod deploys
    maxAge: SEVEN_DAYS,
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export { COOKIE_NAME };
