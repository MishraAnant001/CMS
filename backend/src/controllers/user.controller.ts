import { NextFunction, Request, Response } from "express";
import { ICredentials, IUser } from "../interfaces";
import { UserService } from "../services";

const service = new UserService()

export class UserController{
    async signupUser(req:Request,res:Response,next:NextFunction){
        try {
            const data:IUser = req.body
            const response = await service.signupUser(data);
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async loginUser(req:Request,res:Response,next:NextFunction){
        try {
            const data:ICredentials = req.body
            const response = await service.loginUser(data);
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}