import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { ApiError } from "../config/ApiError.js";
import { AsyncHandler } from "../config/AsyncHandler.js";

// jwt logic token checking type
export const VerifyJWT = AsyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "No access token");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -RefreshToken"
    );

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Access token expired");
  }
});
