import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces";
import { MediaService } from "../services";

const service = new MediaService()

export class MediaController{

    async uploadMedia(req:IRequest,res:Response,next:NextFunction){
        try {
            const response = await service.uploadMedia(req.userid!,req.file)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getMediaByUser(req:IRequest,res:Response,next:NextFunction){
        try {
            const response = await service.getMediaByUser(req.userid!)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getAllMedia(req:IRequest,res:Response,next:NextFunction){
        try {
            const response = await service.getAllMedia()
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async deleteMedia(req:IRequest,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            const response = await service.deleteMedia(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
   
    async incrementLikes(req:IRequest,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            const response = await service.incrementLike(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async decrementLikes(req:IRequest,res:Response,next:NextFunction){
        try {
            const {id}=req.params
            const response = await service.decrementLike(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

}