import { Router } from "express";
import { Authentication } from "../middlewares";
import { ContentController } from "../controllers";

export const contentRouter=Router()
const auth = new Authentication()
const controller= new ContentController()
contentRouter.get("/get-all-content",auth.authenticateAdmin,controller.getAllContents)
contentRouter.get("/get-content",auth.authenticateUser,controller.getContentByUser)
contentRouter.post("/create",auth.authenticateUser,controller.createContent)
contentRouter.put("/:id",auth.authenticateUser,controller.updateContent)
contentRouter.delete("/:id",auth.authenticateUser,controller.deleteContent)

