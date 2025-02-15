import mongoose from "mongoose";

// Connect to MongoDB
const database = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			dbName: "financeFlow", // Specify database name
		});
		console.log("Database connected successfully");
	} catch (err) {
		console.error("Database connection error:", err.message);
		process.exit(1); // Exit on failure
	}
};

export default database;
