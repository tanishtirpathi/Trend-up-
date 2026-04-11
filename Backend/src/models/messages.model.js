import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          emoji: {
            type: String,
          },
          reactedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    seenAt: {
      type: Date,
      default: null,
    },
    expireAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
