import { Router } from "express";
import { Authentication, upload } from "../middlewares";
import { MediaController } from "../controllers";

export const mediaRouter = Router()
const controller = new MediaController()
const auth = new Authentication()

mediaRouter.post("/upload",auth.authenticateUser,upload.single("file"),controller.uploadMedia)
mediaRouter.get("/get-media",auth.authenticateUser,controller.getMediaByUser)
mediaRouter.get("/get-all-media",auth.authenticateAdmin,controller.getAllMedia)
mediaRouter.get("/feed",auth.authenticateUser,controller.getAllMedia)
mediaRouter.delete("/:id",auth.authenticateUser,controller.deleteMedia)