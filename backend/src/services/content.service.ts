import { IContent } from "../interfaces";
import { Content } from "../models";
import { ApiError, ApiResponse, errorCodes, successCodes } from "../utils";

export class ContentService{
    async getAllContents(){
        const data = await Content.find({})
        if(data.length==0){
            throw new ApiError(errorCodes.NOT_FOUND,"No content found!")
        }
        return new ApiResponse(successCodes.OK,"Contents fetched successfully")
    }

    async getContentByUser(user_id:string){
        const data = await Content.find({author:user_id})
        if(data.length==0){
            throw new ApiError(errorCodes.NOT_FOUND,"No content found!")
        }
        return new ApiResponse(successCodes.OK,"Contents fetched successfully")
    }

    async createContent(contentData:IContent){
        const data = await Content.create(contentData)
        return new ApiResponse(successCodes.CREATED,"Content created successfully")
    }

    async updateContent(content_id:string,contentData:IContent){
        const data = await Content.findByIdAndUpdate(content_id,contentData)
        if(!data){
            throw new ApiError(errorCodes.NOT_FOUND,"No content found!")
        }
        return new ApiResponse(successCodes.OK,data,"Content updated successfully")
    }
    
    async deleteContent(content_id:string){
        const data = await Content.findByIdAndDelete(content_id);
        if(!data){
            throw new ApiError(errorCodes.NOT_FOUND,"No content found!")
        }
        return new ApiResponse(successCodes.OK,data,"Content deleted successfully")
    }

}