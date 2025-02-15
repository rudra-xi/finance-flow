import express from "express";
import {
	registerUser,
	signinUser,
	signoutUser,
} from "../Controllers/authController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); //http://127.0.0.1:5000/endpoint/auth/register
router.post("/signin", signinUser); //http://127.0.0.1:5000/endpoint/auth/signin
router.post("/signout", authMiddleware, signoutUser); //http://127.0.0.1:5000/endpoint/auth/signout

export default router;
