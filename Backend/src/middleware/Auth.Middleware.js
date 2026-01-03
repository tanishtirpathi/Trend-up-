import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { ApiError } from "../config/ApiError.js";
import { AsyncHandler } from "../config/AsyncHandler.js";

// jwt logic token checking type
export const VerifyJWT = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "no token found ");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select(
    "-password -RefreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Unauthorized: User not found");
  }
  req.user = user;
  next();
});
