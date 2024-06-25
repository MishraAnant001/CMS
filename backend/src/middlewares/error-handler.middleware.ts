import { Request, Response } from "express";
import { ApiError, errorCodes } from "../utils";

export const errorHandler =(error:any,req:Request,res:Response)=>{
    console.log(error.message );
    if(error instanceof ApiError){
        res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
    if(error.code ==11000){
        res.status(errorCodes.BAD_REQUEST).json({
            success:false,
            message:"User with email already exists!"
        })
    }
    // console.log(error);
    res.status(errorCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:error.message
    })
}