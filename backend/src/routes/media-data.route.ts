import { Router } from "express";
import { Authentication } from "../middlewares";
import { MediaDataController } from "../controllers/media-data.controller";

export const mediaDataRouter = Router()
const auth = new Authentication()
const controller = new MediaDataController()
mediaDataRouter.get("/like/add/:id",auth.authenticateUser,controller.addLike)
mediaDataRouter.delete("/like/remove/:id",auth.authenticateUser,controller.removeLike)
mediaDataRouter.get("/like/get",auth.authenticateUser,controller.getLikes)
mediaDataRouter.post("/comment/add/:id",auth.authenticateUser,controller.addComment)
mediaDataRouter.delete("/comment/remove/?",auth.authenticateUser,controller.removeComment)
mediaDataRouter.get("/comment/get/:id",auth.authenticateUser,controller.getComments)
