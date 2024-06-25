import { Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router()
const controller= new UserController()
userRouter.post("/login",controller.loginUser);
userRouter.post("/signup",controller.signupUser);