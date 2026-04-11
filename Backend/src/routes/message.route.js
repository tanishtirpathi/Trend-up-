import express from "express";
import {
  getAlLUser,
  getMessages,
  sendMessage,
  markMessagesAsSeen,
  reactToMessage,
} from "../controllers/message.controller.js";
import { VerifyJWT } from "../middleware/Auth.Middleware.js";
import { upload } from "../middleware/multer.middleware.js";

import { validate } from "../middleware/validate.js";
import { messageSchema } from "../config/schemas.js";

const router = express.Router();
router.get("/users", VerifyJWT, getAlLUser);
router
  .get("/:id", VerifyJWT, getMessages)
  .post("/send/:id", VerifyJWT, upload.single("image"),validate(messageSchema) ,  sendMessage);
router.put("/seen/:id", VerifyJWT, markMessagesAsSeen);

router.post("/react", VerifyJWT,validate(reactSchema) , reactToMessage);
export default router;
