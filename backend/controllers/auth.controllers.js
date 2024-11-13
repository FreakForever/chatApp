import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Signup
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: `https://ui-avatars.com/api/?name=${username}`,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Logout
export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newUsername, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update username if provided
        if (newUsername) {
            user.username = newUsername;
        }

        // Update password if provided
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        // Send back the updated user object without sensitive data
        const updatedUser = user.toObject();
        delete updatedUser.password; // Remove the password field from the response

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
};







