import jwt from "jsonwebtoken";
import { TokenBlacklist } from "../Models/TokenBlacklists.js";

// Middleware to authenticate user
const authMiddleware = async (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token

	if (!token) {
		return res.status(401).json({ message: "No token provided" }); // No token error
	}

	try {
		// Check if the token is blacklisted
		const isBlacklisted = await TokenBlacklist.findOne({ token });
		if (isBlacklisted) {
			return res.status(401).json({ message: "Token is invalid" }); // Token blacklisted error
		}

		// Verify the token
		if (!process.env.JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined"); // Secret not defined error
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
		req.userId = decoded.userId; // Attach userId to request
		next(); // Proceed to next middleware
	} catch (err) {
		res.status(401).json({ message: err.message }); // Token verification error
	}
};

export default authMiddleware;
