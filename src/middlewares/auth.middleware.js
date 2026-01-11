import jwt from "jsonwebtoken";
import cacheInstance from "../services/cache.service.js";
import UserModel from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const isBlacklisted = await cacheInstance.get(token);

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token blacklisted",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
