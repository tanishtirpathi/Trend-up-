import {
  registerUser,
  login,
  logout,
  MyProfile,
  UpdateUser,
  refreshAccessToken,
} from "../controllers/User.controller.js";
import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { VerifyJWT } from "../middleware/Auth.Middleware.js";
import {googleAuth} from "../controllers/google.controller.js"
const AuthRouter = express.Router();
//Register Route
AuthRouter.post("/signup", upload.single("avatar"), registerUser);
AuthRouter.post("/Login", login);
AuthRouter.post("/google", googleAuth);
AuthRouter.get("/logout", logout);
AuthRouter.get("/refresh", refreshAccessToken);
AuthRouter.get("/me", VerifyJWT, MyProfile);
AuthRouter.put("/update", VerifyJWT, upload.single("avatar"), UpdateUser);
export default AuthRouter;
