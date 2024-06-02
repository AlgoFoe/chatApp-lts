import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsersList = async (req, res) => {
	try {
		const myId = req.user._id;
		const filteredUsers = await User.find({ _id: { $ne: myId } }).select("-password");
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUserProfile=async (req, res) => {
	// query is either username or userId
	const { query } = req.params;

	try {
		let user;
		// query is userId
		if (mongoose.Types.ObjectId.isValid(query)) {
			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
		} else {
			// query is username
			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
		}

		if (!user) return res.status(404).json({ error: "User not found" });

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
};