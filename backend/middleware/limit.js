import RateLimit from "express-rate-limit";

const ApiRateLimiter = RateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "To many attempts",
});
export default ApiRateLimiter;
