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

// Enable CORS for specific origins
server.use(
	cors({
		origin: [
			"https://finance-flow-xuyt.onrender.com",
			"http://localhost:3000",
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

server.use(express.json()); // Parse JSON

database(); // Connect to database

// Handle preflight requests
server.options("*", cors());

// Define routes
server.use("/auth", authRoute); // http://finance-flow-backend.onrender.com/auth/
server.use("/budget", budgetRoute); // http://finance-flow-backend.onrender.com/budget/
server.use("/expense", expenseRoute); // http://finance-flow-backend.onrender.com/expense/

server.get("/", (req, res) => {
	res.send("Backend Running");
});

//! 
// // Define routes
// server.use("/endpoint/auth", authRoute); //http://127.0.0.1:5000/endpoint/auth/
// server.use("/endpoint/budget", budgetRoute); //http://127.0.0.1:5000/endpoint/budget/
// server.use("/endpoint/expense", expenseRoute); //http:127.0.0.1:5000/endpoint/expense/

server.listen(PORT, () => {
	console.log(`Server is Running on http://localhost:${PORT}`);
});
