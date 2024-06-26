import { NextFunction, Response } from "express";
import { IContent, IRequest } from "../interfaces";
import { ContentService } from "../services";

const service = new ContentService

export class ContentController{
    async getAllContents(req:IRequest,res:Response,next:NextFunction){
        try {
            const response= await service.getAllContents()
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getContentByUser(req:IRequest,res:Response,next:NextFunction){
        try {
            const user_id:string=req.userid!
            const response= await service.getContentByUser(user_id)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async createContent(req:IRequest,res:Response,next:NextFunction){
        try {
            const content:IContent=req.body
            const user_id:string=req.userid!
            content.author=user_id
            const response= await service.createContent(content)
            return res.status(response.statusCode).json(response)
            
        } catch (error) {
            next(error)
        }
    }
    async updateContent(req:IRequest,res:Response,next:NextFunction){
        try {
            const{id}=req.params
            const content:IContent=req.body
            const response= await service.updateContent(id,content)
            return res.status(response.statusCode).json(response)

        } catch (error) {
            next(error)
        }
    }
    async deleteContent(req:IRequest,res:Response,next:NextFunction){
        try {
            const{id}=req.params
            const response= await service.deleteContent(id)
            return res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

}