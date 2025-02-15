import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./database.js";
import authRoute from "./Routes/authRoute.js";
import budgetRoute from "./Routes/budgetRoute.js";
import expenseRoute from "./Routes/expenseRoute.js";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000; // Set port

const server = express();

server.use(cors()); // Enable CORS
server.use(express.json()); // Parse JSON

database(); // Connect to database

server.get("/", (req, res) => {
	res.send("Backend Running");
});

// Define routes
server.use("/endpoint/auth", authRoute); //http://127.0.0.1:5000/endpoint/auth/
server.use("/endpoint/budget", budgetRoute); //http://127.0.0.1:5000/endpoint/budget/
server.use("/endpoint/expense", expenseRoute); //http:127.0.0.1:5000/endpoint/expense/

server.listen(PORT, () => {
	console.log(`Server is Running on http://localhost:${PORT}`);
});
