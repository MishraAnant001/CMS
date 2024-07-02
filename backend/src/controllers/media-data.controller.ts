import { NextFunction, Response } from "express";
import { MediaLikesService } from "../services/media-likes.service";
import { IRequest } from "../interfaces";

const service = new MediaLikesService()

export class MediaDataController{
    async addLike(req:IRequest,res:Response,next:NextFunction){
        try {
            const userid= req.userid
            const{id}=req.params
            const response = await service.addlike(id,userid!)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async removeLike(req:IRequest,res:Response,next:NextFunction){
        try {
            const userid= req.userid
            const{id}=req.params
            const response = await service.removeLike(id,userid!)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getLikes(req:IRequest,res:Response,next:NextFunction){
        try {
            const userid= req.userid
            const response = await service.getLikes(userid!)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getComments(req:IRequest,res:Response,next:NextFunction){
        try {
            const{id}=req.params
            const response = await service.getComments(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async addComment(req:IRequest,res:Response,next:NextFunction){
        try {
            const userid= req.userid
            const{id}=req.params
            const {comment} = req.body
            const response = await service.addComment(id,userid!,comment)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async removeComment(req:IRequest,res:Response,next:NextFunction){
        try {
            const userid= req.userid
            const{fileid,commentid}=req.query
            const response = await service.removeComment(fileid as string,userid!,commentid as string)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    } 
}
