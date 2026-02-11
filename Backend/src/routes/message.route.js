import express from "express";
import {
  getAlLUser,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { VerifyJWT } from "../middleware/Auth.Middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();
router.get("/users", VerifyJWT, getAlLUser);
router
  .get("/:id", VerifyJWT, getMessages)
  .post("/send/:id", VerifyJWT, upload.single("image"), sendMessage);
export default router;
