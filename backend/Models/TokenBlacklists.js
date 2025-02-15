import mongoose from "mongoose";

const TokenBlacklistSchema = new mongoose.Schema({
	token: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now, expires: "5h" }, // Token expires in 5 hours
});

export const TokenBlacklist = mongoose.model(
	"TokenBlacklist",
	TokenBlacklistSchema
);
