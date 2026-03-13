import express from "express";
import {
  getAlLUser,
  getMessages,
  sendMessage,
  markMessagesAsSeen
} from "../controllers/message.controller.js";
import { VerifyJWT } from "../middleware/Auth.Middleware.js";
import { upload } from "../middleware/multer.middleware.js";

import { validate } from "../middleware/validate";
import { messageSchema } from "../../shared/schemas";

const router = express.Router();
router.get("/users", VerifyJWT, getAlLUser);
router
  .get("/:id", VerifyJWT, getMessages)
  .post("/send/:id", VerifyJWT, upload.single("image"),validate(messageSchema) ,  sendMessage);
router.put("/seen/:id", VerifyJWT, markMessagesAsSeen);

export default router;
