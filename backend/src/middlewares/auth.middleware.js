import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  let token;

  // Check cookie first, then Authorization header
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "Not authorized, no token provided"));
  }

  try {
    const secret = process.env.JWT_SECRET || "supersecretjwtkey_algonerd_2026";
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new ApiError(401, "Not authorized, user no longer exists"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Not authorized, token verification failed"));
  }
};
