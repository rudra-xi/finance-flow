import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { TokenBlacklist } from "../Models/TokenBlacklists.js";

// Register a new user
const registerUser = async (req, res) => {
	try {
		const { email, name, password } = req.body;

		// Validate input
		if (!email || !name || !password) {
			return res.status(400).json({
				message: "All Fields Are Required.",
				status: false,
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: "User Already Exists.",
				status: false,
			});
		}

		// Create and save new user
		const user = new User({ name, email, password });
		await user.save();

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "5h",
		});

		res.status(201).json({
			message: "Registration Successful!",
			status: true,
			token,
		});
	} catch (err) {
		res.status(500).json({ error: err.message, status: false });
	}
};

// Sign in an existing user
const signinUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res.status(404).json({
				message: "User Not Found.",
				status: false,
			});

		// Validate password
		const isMatch = await user.comparePassword(password);
		if (!isMatch)
			return res.status(400).json({
				message: "Invalid Credentials.",
				status: false,
			});

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "5h",
		});
		res.status(200).json({
			message: "Signed In Successful!",
			status: true,
			token,
		});
	} catch (err) {
		res.status(500).json({ error: err.message, status: false });
	}
};

// Sign out a user
const signoutUser = async (req, res) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			return res.status(400).json({
				message: "No Token Provided.",
				status: false,
			});
		}

		// Add the token to the blacklist
		await TokenBlacklist.create({ token });

		res.status(200).json({
			message: "Singed Out Successfully.",
			status: true,
		});
	} catch (err) {
		res.status(500).json({ error: err.message, status: false });
	}
};

export { registerUser, signinUser, signoutUser };
