import express from "express";
import path from "path";
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
		origin: [process.env.RENDER_FRONTEND_URL, process.env.FRONTEND_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

server.use(express.json()); // Parse JSON

database(); // Connect to database

// Handle preflight requests
server.options("*", cors());

// Define API routes
server.use("/auth", authRoute); // http://finance-flow-backend.onrender.com/auth/
server.use("/budget", budgetRoute); // http://finance-flow-backend.onrender.com/budget/
server.use("/expense", expenseRoute); // http://finance-flow-backend.onrender.com/expense/

// Serve static files from the frontend's build folder
const __dirname = path.resolve();
server.use(express.static(path.join(__dirname, "../frontend/dist")));

// Serve the frontend's index.html for all other routes
server.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

server.listen(PORT, () => {
	console.log(`Server is Running on http://localhost:${PORT}`);
});
