import mongoose from "mongoose";

const mediaSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    path:{
        type:String,
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