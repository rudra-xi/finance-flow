import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
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

// Serve static files from the frontend build directory
const __dirname = path.resolve();
server.use(express.static(path.join(__dirname, "frontend", "build")));

server.get("/", (req, res) => {
	res.send("Backend Running");
});

// Define routes
server.use("/auth", authRoute); // http://finance-flow-backend.onrender.com/auth/
server.use("/budget", budgetRoute); // http://finance-flow-backend.onrender.com/budget/
server.use("/expense", expenseRoute); // http://finance-flow-backend.onrender.com/expense/

// Catch-all route to serve index.html for any requests not matching API routes
server.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

server.listen(PORT, () => {
	console.log(`Server is Running on http://localhost:${PORT}`);
});
