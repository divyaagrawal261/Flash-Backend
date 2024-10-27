import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Owner Name is required"]
    },
    ownerHandle:{
        type:String,
        required:[true, "Owner handle is required"],
        unique:[true, "Owner handle already taken"]
    },
    email:{
        type:String,
        unique:[true, "Owner Email already in user"],
        required:[true, "Owner Email is required"]
    },
    password:{
        type:String,
        required:[true, "Owner password is required"]
    }
});

export const owner = new mongoose.model("owner", ownerSchema);