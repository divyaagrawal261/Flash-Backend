import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
    playgroundId:{
        type:mongoose.Schema.ObjectId,
        ref:"playground",
        required:[true, "Please provide a playground ID"]
    },
    ownerId:{
        type:mongoose.Schema.ObjectId,
        ref:"owner",
        required:[true, "Please provide a owner ID"]
    },
    time:{
        type:String,
        required:[true, "Please provide a slot time"]
    },
    date:{
        type:Date,
        required:[true, "Please enter a date"]
    },
    players:[{type:mongoose.Schema.ObjectId, ref:"player"}],
    slotSize:{
        type:Number,
        default:1,
        required:[true, "Please provide the slot size"]
    }
});

export const slots = new mongoose.model("slot", slotSchema);