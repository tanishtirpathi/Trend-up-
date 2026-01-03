import User from "../models/User.model.js";
import { ApiResponse } from "../config/ApiResp.js";
import { ApiError } from "../config/ApiError.js";
import { AsyncHandler } from "../config/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const registerUser = AsyncHandler(async (req, res) => {
  //!logic time
  //get simple data from body
  //check data
  //check existing User
  //image upload on cloudinary
  //response send
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  let avatarUrl = "";
  if (req.file?.path) {
    const avatarUpload = await uploadOnCloudinary(req.file.path);
    if (!avatarUpload?.url) {
      throw new ApiError(400, "Avatar upload failed");
    }
    avatarUrl = avatarUpload.url;
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: avatarUrl,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.RefreshToken = refreshToken;
  await user.save();

  const createdUser = await User.findById(user._id).select(
    "-password -RefreshToken"
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

export const login = AsyncHandler(async (req, res) => {
  //!logic time now
  // take data from user now
  // then validate the user
  //check user already exist or not
  // match the password
  // generate access or refresh token
  //save the refresh token
  // login the user
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "all field required ");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(409, "user not exist sorry sir");
  }
  const MatchPassword = await user.isPasswordCorrect(password);
  if (!MatchPassword) {
    throw new ApiError(400, "wrong password");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.RefreshToken = refreshToken;
  // console.log(`this is the login time accessToken ${accessToken}`);
  await user.save();
  const loggedInUser = await User.findById(user._id).select(
    "-password -RefreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json(new ApiResponse(200, "User login successfully", loggedInUser));
});
export const logout = AsyncHandler(async (req, res) => {
  //!logic time
  //get accessToken from cookies
  //check
  //jwt verify
  //get user
  //refresh token delete
  //user log out
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    throw new ApiError(401, "Not authenticated");
  }

  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Invalid token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.RefreshToken = null;
  await user.save();

  return res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});
export const MyProfile = AsyncHandler(async (req, res) => {
  //!logic time buddy
  //user came
  //send as response
  const NewUser = req.user;
  if (!NewUser) {
    throw new ApiError(400, "no user found ");
  }
  re.status(200).json(new ApiResponse(200, "This is your profile", NewUser));
});
export const UpdateUser = AsyncHandler(async (req, res) => {
  //!logic time buddy
  // user Id get from data
  //check user
  //upload file change file
  // send response
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!req.file?.path) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatarUpload = await uploadOnCloudinary(req.file.path);
  if (!avatarUpload?.url) {
    throw new ApiError(400, "Avatar upload failed");
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: { avatar: avatarUpload.url },
    },
    { new: true }
  ).select("-password -RefreshToken");
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", updatedUser));
});
