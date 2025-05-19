import User from    "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSider = async (req, res) => {   
  try {
    const { userId } = req.user; // Get the userId from the request object

    // Find all users except the current user
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params; // Get the userId from the request parameters
    const { userId } = req.user; // Get the userId from the request object

    // Find all messages between the two users
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: id },
        { senderId: id, receiverId: userId }
      ]
    }).populate("senderId", "name").populate("receiverId", "name");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the userId from the request parameters
    const { userId } = req.user; // Get the userId from the request object
    const { text, image } = req.body; // Get the message text and image from the request body


    let imageUrl;
    if (image) {

      const result = await cloudinary.uploader.upload(image, {
        folder: "messages",
        width: 500,
        crop: "scale"
      });
      imageUrl = result.secure_url;
    }


    // Create a new message
    const newMessage = new Message({
      senderId: userId,
      receiverId: id,
      text,
      image:imageUrl
    });

    

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}