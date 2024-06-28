import mongoose from "mongoose";

const mediaLikesCommentsSchema =new mongoose.Schema({
    media:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Media",
        unique:true
    },
    likes:{
        type:Array<mongoose.Schema.Types.ObjectId>,
        ref:"User",
        default:[]
    },
    comments:{
        type:[
            {
                userid:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                },
                comment:String
            }
        ],
        default:[]
    }
})

export const MediaLikesComments = mongoose.model("MediaLikesComments",mediaLikesCommentsSchema)