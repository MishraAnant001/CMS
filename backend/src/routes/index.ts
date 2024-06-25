import { Router } from "express";
import { userRouter } from "./user.route";

export const mainRouter= Router()

mainRouter.use("/api/v1/user",userRouter)