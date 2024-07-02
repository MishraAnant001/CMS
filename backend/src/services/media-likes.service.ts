import mongoose from "mongoose";
import { MediaLikesComments } from "../models";
import { ApiResponse, successCodes } from "../utils";

export class MediaLikesService{
    async addlike(fileid:string,userid:string){
        const fileData = await MediaLikesComments.findOne({media:fileid})
        if(!fileData){
            const data = await MediaLikesComments.create({media:fileid,likes:[new mongoose.Types.ObjectId(userid) ]})
            return new ApiResponse(successCodes.OK,data,"Like added successfully")
        }
        const data = await MediaLikesComments.findOneAndUpdate({media:fileid},{
            $push:{
                likes:new mongoose.Types.ObjectId(userid)
            }
        })
        return new ApiResponse(successCodes.OK,data,"Like added successfully")
    }
    async removeLike(fileid:string,userid:string){
        const data = await MediaLikesComments.findOneAndUpdate({media:fileid},{
            $pull:{
                likes:new mongoose.Types.ObjectId(userid)
            }
        })
        return new ApiResponse(successCodes.OK,data,"Like removed successfully")
    }

    async getLikes(userid:string){
        const data = await MediaLikesComments.find({
            likes:new mongoose.Types.ObjectId(userid)
        })
        // console.log(data);
        return new ApiResponse(successCodes.OK,data,"Likes fetched successfully")
    }

    async getComments(fileid:string){
        const data = await MediaLikesComments.findOne({media:fileid}).select("_id media comments")
        return new ApiResponse(successCodes.OK,data,"Comments fetched successfully")
    }

    async addComment(fileid:string,userid:string,comment:string){
        const fileData = await MediaLikesComments.findOne({media:fileid})
        if(!fileData){
            const data = await MediaLikesComments.create({media:fileid,comments:[{userid:userid,comment:comment}]})
            return new ApiResponse(successCodes.OK,data,"Comment added successfully")
        }
        const data = await MediaLikesComments.findOneAndUpdate({media:fileid},{
            $push:{
                comments:{
                    userid:userid,
                    comment:comment
                }
            }
        })
        return new ApiResponse(successCodes.OK,data,"Comment added successfully")
    }
    async removeComment(fileid:string,userid:string,commentid:string){
        const data = await MediaLikesComments.findOneAndUpdate({media:fileid},{
            $pull:{
                comments:{
                    userid:userid,
                    _id:commentid
                }
            }
        })
        return new ApiResponse(successCodes.OK,data,"Comment removed successfully")
    }
}