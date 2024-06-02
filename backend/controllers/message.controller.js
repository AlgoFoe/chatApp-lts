import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message,formattedTime } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;
		
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
				lastMessage: {
					text: message,
					sender: senderId,
					updatedTime:formattedTime
				}
			});
		}

		const newMessage = new Message({
			conversationId: conversation._id,
			senderId,
			receiverId,
			message,
		});

		await newMessage.save();

		conversation.messages.push(newMessage._id);
		conversation.lastMessage = {
			text: message,
			sender: senderId,
			updatedTime:formattedTime
		};

		await conversation.save();
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
			io.to(receiverSocketId).emit("newLastMsg",newMessage);
		}

		res.status(201).json(newMessage);

	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getConversations = async (req, res) => {
	const userId = req.user._id;
	try {
		const conversations = await Conversation.find({participants:userId}).populate({
			path:"participants",
			select:"username profilePic"
		});
		conversations.forEach(conversation=>{
			conversation.participants = conversation.participants.filter(
				participant=> participant._id.toString()!==userId.toString()
            );
		});
		res.status(200).json(conversations);
		
	} catch (error) {
		console.log("Error in getConversations controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};





