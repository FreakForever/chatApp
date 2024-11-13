import express from "express";
import { signup, login, logout, deleteUser, updateUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.delete("/delete/:userId", deleteUser);

router.patch("/update/:userId", updateUser);

export default router;