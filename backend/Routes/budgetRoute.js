import express from "express";
import {
	currentBudget,
	resetBudget,
	updateBudget,
} from "../Controllers/budgetController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Apply authMiddleware in Routers
router.get("/", authMiddleware, currentBudget); 
router.post("/", authMiddleware, updateBudget); 
router.post("/reset", authMiddleware, resetBudget); 

export default router;
