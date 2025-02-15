import express from "express";
import {
	allExpenses,
	deleteExpenses,
	newExpenses,
} from "../Controllers/expenseController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Apply authMiddleware in Routers
router.get("/", authMiddleware, allExpenses); 
router.post("/", authMiddleware, newExpenses); 
router.delete("/:id", authMiddleware, deleteExpenses); 

export default router;
