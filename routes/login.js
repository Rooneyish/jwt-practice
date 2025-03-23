import express from "express";
import { loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/api/login", loginUser);

export default router