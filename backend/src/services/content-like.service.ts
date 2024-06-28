import { contentLikesComments } from "../models";
import { ApiResponse, successCodes } from "../utils";

export class ContentLikeService{
    async addlike(fileid:string,userid:string){
        const fileData = await contentLikesComments.findOne({content:fileid})
        if(!fileData){
            const data = await contentLikesComments.create({content:fileid,likes:[userid]})
            return new ApiResponse(successCodes.OK,data,"Like added successfully")
        }
        const data = await contentLikesComments.findOneAndUpdate({content:fileid},{
            $push:{
                likes:userid
            }
        })
        return new ApiResponse(successCodes.OK,data,"Like added successfully")
    }

    async getLikes(fileid:string){
        const data = await contentLikesComments.findOne({content:fileid}).select("_id media likes")
        return new ApiResponse(successCodes.OK,data,"Likes fetched successfully")
    }
    async removeLike(fileid:string,userid:string){
        const data = await contentLikesComments.findOneAndUpdate({media:fileid},{
            $pull:{
                likes:userid
            }
        })
        return new ApiResponse(successCodes.OK,data,"Like removed successfully")
    }

    async getComments(fileid:string){
        const data = await contentLikesComments.findOne({content:fileid}).select("_id media comments")
        return new ApiResponse(successCodes.OK,data,"Comments fetched successfully")
    }

    async addComment(fileid:string,userid:string,comment:string){
        const fileData = await contentLikesComments.findOne({content:fileid})
        if(!fileData){
            const data = await contentLikesComments.create({content:fileid,comments:[{userid:userid,comment:comment}]})
            return new ApiResponse(successCodes.OK,data,"Comment added successfully")
        }
        const data = await contentLikesComments.findOneAndUpdate({content:fileid},{
            $push:{
                comments:{
                    userid:userid,
                    comment:comment
                }
            }
        })
        return new ApiResponse(successCodes.OK,data,"Comment added successfully")
    }
    async removeComment(fileid:string,userid:string,comment:string){
        const data = await contentLikesComments.findOneAndUpdate({content:fileid},{
            $pull:{
                comments:{
                    userid:userid,
                    comment:comment
                }
            }
        })
        return new ApiResponse(successCodes.OK,data,"Comment removed successfully")
    }
}