import { IContent } from "../interfaces";
import { Content } from "../models";
import { ApiError, ApiResponse, errorCodes, successCodes } from "../utils";

export class ContentService{
    async getAllContents(){
        const data = await Content.aggregate([
            {
                $lookup: {
                  from: "users",
                  localField: "author",
                  foreignField: "_id",
                  as: "author"
                }
              },
              {
                $project: {
                  author: { $first: ["$author.name"] },
                  content:1,
                  title:1
                }
              }
        ])
        if(data.length==0){
            throw new ApiError(errorCodes.NOT_FOUND,"No content found!")
        }
        return new ApiResponse(successCodes.OK,data,"Contents fetched successfully")
    }

    async getContentByUser(user_id:string){
        const data = await Content.find({author:user_id})
        if(data.length==0){
            throw new ApiError(errorCodes.NOT_FOUND,"No content found!")
        }
        return new ApiResponse(successCodes.OK,data,"Contents fetched successfully")
    }

    async createContent(contentData:IContent){
        const data = await Content.create(contentData)
        return new ApiResponse(successCodes.CREATED,data,"Content created successfully")
    }

    async updateContent(content_id:string,contentData:IContent){
        const data = await Content.findByIdAndUpdate(content_id,contentData,{new:true})
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