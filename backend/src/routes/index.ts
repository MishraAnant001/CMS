import { Router } from "express";
import { userRouter } from "./user.route";
import { contentRouter } from "./content.route";
import { mediaRouter } from "./media.route";
import { dashboardRouter } from "./dashboard.route";

export const mainRouter= Router()

mainRouter.use("/api/v1/user",userRouter)
mainRouter.use("/api/v1/content",contentRouter)
mainRouter.use("/api/v1/media",mediaRouter)
mainRouter.use("/api/v1/dashboard",dashboardRouter)