import express from "express";
import { getAllUsers } from "../controllers/user.controllers.js"; // Import the controller function

const router = express.Router();

// Get all users except the currently logged-in user
router.get("/", getAllUsers);

export default router;




