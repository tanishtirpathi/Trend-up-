import Message from "../models/messages.model.js";
import { ApiResponse } from "../config/ApiResp.js";
import { ApiError } from "../config/ApiError.js";
import User from "../models/User.model.js";
import { AsyncHandler } from "../config/AsyncHandler.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { getReceiveSocketId, io } from "../config/socket.js";
export const getAlLUser = AsyncHandler(async (req, res) => {
  //!logic time buddy
  //get me
  // ge other user simple
  // not include me in that
  // send other users
  const ThisUser = req.user._id;
  if (!ThisUser) {
    throw new ApiError(400, "Sorry User is not authenticated ");
  }
  const OtherUser = await User.find({ _id: { $ne: ThisUser } }).select(
    "-password",
  );
  // console.log(OtherUser);
  res
    .status(201)
    .json(new ApiResponse(201, "Here is the Other users ", OtherUser));
});
export const getMessages = AsyncHandler(async (req, res) => {
  //!logic time bro
  // get receiver Id
  // get my id
  // message logic which is finding the message from that id receiver both
  // send all messages
  const { id: userChattingId } = req.params;
  const senderId = req.user._id;
  if (!senderId) {
    throw new ApiError(400, "user not authenticated ");
  }
  const messages = await Message.find({
    $or: [
      { senderId: senderId, receiverId: userChattingId },
      { senderId: userChattingId, receiverId: senderId },
    ],
  });
  res
    .status(200)
    .json(new ApiResponse(200, "here is the whole chat", messages));
});
export const sendMessage = AsyncHandler(async (req, res) => {
  //!logic time buddy
  //get data : Image ,text , sender receiver Id both
  // image upload to cloudinary
  // save everything in message model
  // add real time thing
  const { text } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  if (!senderId || !receiverId) {
    throw new ApiError(400, "not get the ID");
  }
  //*upload image to cloudinary
  let imageUrl = "";
  if (req.file?.buffer) {
    const imageUpload = await uploadOnCloudinary(req.file.buffer);
    if (!imageUpload?.url) {
      throw new ApiError(400, "Message image upload failed");
    }
    imageUrl = imageUpload.url;
  }
  const NewMessage = new Message({
    senderId: senderId,
    receiverId: receiverId,
    text: text,
    image: imageUrl,
    seen:false, 
    seenAt: null ,
    expireAt: null,
  });
  await NewMessage.save();

  // const receiverSocketIds = getReceiveSocketId(receiverId);

  // if (receiverSocketIds) {
  //   receiverSocketIds.forEach((socketId) => {
  //     io.to(socketId).emit("NewMessage", NewMessage);
  //   });
  // }
const receiverSocketId = getReceiveSocketId(receiverId);

if (receiverSocketId) {
  io.to(receiverSocketId).emit("NewMessage", NewMessage);
  io.to(receiverSocketId).emit("newNotification", {
  from: senderId,
});

}

  res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", NewMessage));
});
export const markMessagesAsSeen = AsyncHandler(async (req, res) => {
  const { id: chatUserId } = req.params; // the person I am chatting with
  const currentUserId = req.user._id; // logged-in user

  if (!currentUserId || !chatUserId) {
    throw new ApiError(400, "Invalid user IDs");
  }

  const now = new Date(); 
  const fifteenMinutesLater = new Date(now.getTime() + 15* 60 * 1000);
 
  const updatedMessages = await Message.updateMany(
    {
      senderId: chatUserId,
      receiverId: currentUserId,
      seen: false,
    },
    {
      $set: {
        seen: true,
        seenAt: now,
        expiresAt: fifteenMinutesLater,
      },
    }
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Messages marked as seen",
      updatedMessages
    )
  );
});
