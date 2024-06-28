import { Media } from "../models";
import fs from "fs"
import { ApiError, ApiResponse, errorCodes, successCodes } from "../utils";

export class MediaService {
    async uploadMedia(userid: string, file: any) {
        const data = await Media.create({
            userid: userid,
            file: file
        })
        return new ApiResponse(successCodes.OK, data, "File uploaded successfully")
    }

    async getMediaByUser(userid: string) {
        const data = await Media.find({ userid: userid })
        if (data.length == 0) {
            throw new ApiError(errorCodes.NOT_FOUND, "No file found")
        }
        return new ApiResponse(successCodes.OK, data, "Files fetched successfully")
    }
    async getAllMedia() {
        const data = await Media.aggregate([
            {
                $lookup: {
                  from: "users",
                  localField: "userid",
                  foreignField: "_id",
                  as: "user"
                }
              },
              {
                $project: {
                  file:1,
                  user:{$first:["$user.name"]}
                }
              }
        ])
        if (data.length == 0) {
            throw new ApiError(errorCodes.NOT_FOUND, "No file found")
        }
        return new ApiResponse(successCodes.OK, data, "Files fetched successfully")
    }
    async deleteMedia(file_id: string) {
        const data = await Media.findById(file_id)
        if (!data) {
            throw new ApiError(errorCodes.NOT_FOUND, "No file found")
        }
        fs.unlink(data.file.path, (err) => {
            if (err) throw new ApiError(errorCodes.INTERNAL_SERVER_ERROR, "Error while deleting file");
        });
        await Media.findByIdAndDelete(file_id)
        return new ApiResponse(successCodes.OK, data, "File deleted successfully")
    }

    async incrementLike(id:string){
        const media = await Media.findById(id)
        media!.likes=media!.likes++
        await media!.save()
        return new ApiResponse(successCodes.OK,[],"Like incremented")
    }

    async decrementLike(id:string){
        const media = await Media.findById(id)
        media!.likes=media!.likes--
        await media!.save()
        return new ApiResponse(successCodes.OK,[],"Like decremented")
    }
}