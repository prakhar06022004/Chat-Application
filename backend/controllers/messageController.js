import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.id;
    const { receiver } = req.params;
    const { message } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const conversation = await Conversation.create({
      participants: { $all: [sender, receiver] },
    });
    const newMessage = await Message.create({
      sender,
      receiver,
      image,
      message,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        message: [newMessage._id],
      });
    } else {
      conversation.message.push(newMessage._id);
     await conversation.save();
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: "send message error", error });
  }
};
