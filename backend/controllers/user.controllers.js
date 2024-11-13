import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Assuming you have a User model

// Controller to get all users except the currently logged-in user
export const getAllUsers = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); 
        const currentUserId = decoded.id;

        const users = await User.find({ _id: { $ne: currentUserId } });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error); 
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

