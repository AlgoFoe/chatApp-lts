import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/genJWT.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log(req.body);

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Password did not match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists"});
		}

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);


		const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const new_user = new User({
			fullName,
			username,
			password: hashed,
			gender,
			profilePic: gender === "male" ? boyProfile : girlProfile,
		});

		if (new_user) {
			generateTokenAndSetCookie(new_user._id, res);
			await new_user.save();

			res.status(201).json({
				_id: new_user._id,
				fullName: new_user.fullName,
				username: new_user.username,
				profilePic: new_user.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};