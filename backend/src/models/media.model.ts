import mongoose from "mongoose";

const mediaSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    file:{
        type:Object,
        required:true
    },
    likes:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const Media = mongoose.model("Media",mediaSchema)