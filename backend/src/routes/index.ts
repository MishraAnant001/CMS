import { Router } from "express";
import { userRouter } from "./user.route";
import { contentRouter } from "./content.route";

export const mainRouter= Router()

mainRouter.use("/api/v1/user",userRouter)
mainRouter.use("/api/v1/content",contentRouter)