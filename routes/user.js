
import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware,getUsers);
userRouter.get("/:id", authMiddleware, getUser);

export default userRouter;