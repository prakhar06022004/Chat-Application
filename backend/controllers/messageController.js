import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const conversation = await Conversation.findOne({
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
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: "send message error", error });
  }
};

export const getMessages = async (req, res) => {
  const { sender } = req.userId;
  const { receiver } = req.params;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");
    if (!conversation) {
      return res.status(400).json({ message: "conversation is not found!" });
    }
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({ message: "getMessage error", error });
  }
};
