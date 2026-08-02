import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }

        next();
    } catch (error) {
        // Fail open: if the rate-limit store (Upstash Redis) is unreachable,
        // don't take the whole API down — log it and let the request through.
        console.error("Rate limiter unavailable, allowing request through:", error.message);
        next();
    }
};

export default rateLimiter;
