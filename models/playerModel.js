import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "User Name is required"]
    },
    userhandle:{
        type:String,
        unique:[true, "User handle already taken"],
        required:[true, "User handle is required"]
    },
    bookings:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'playground' }]
    },
    DOB:{
        type:String,
        required:[true, "Please enter your Date of Birth"]
    },
    phone:{
        type:Number,
        unique:[true, "Phone Number already taken"],
        required:[true, "Please provide the contact number"]
    },
    perferredSports:{
        type:String,
    },
    email:{
        type:String,
        unique:[true, "User Email already in user"],
        required:[true, "User Email is required"]
    },
    password:{
        type:String,
        required:[true, "User password is required"]
    }
})

export const player = new mongoose.model("player", playerSchema);