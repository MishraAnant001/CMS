import { Content, Media, User } from "../models";
import { ApiResponse, successCodes } from "../utils";

export class DashboardService{
    async getUserDashBoard(id:string){
        const media = await Media.find({userid:id})
        const content = await Content.find({author:id})
        const data ={
            media:media.length,
            content:content.length
        }
        return new ApiResponse(successCodes.OK,data,"Dashboard fetched successfully")
    }
    async getAdminDashBoard(){
        const media = await Media.find({})
        const content = await Content.find({})
        const users = await User.find({})
        const data ={
            media:media.length,
            content:content.length,
            users:users.length
        }
        return new ApiResponse(successCodes.OK,data,"Dashboard fetched successfully")
    }
}