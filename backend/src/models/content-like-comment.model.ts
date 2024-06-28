import mongoose from "mongoose";

const contentLikesCommentsSchema =new mongoose.Schema({
    content:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Content",
        unique:true
    },
    likes:{
        type:Array<mongoose.Schema.Types.ObjectId>,
        ref:"User"
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

export const contentLikesComments = mongoose.model("ContentLikesComments",contentLikesCommentsSchema)