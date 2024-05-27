import User from "../models/user.model.js";

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