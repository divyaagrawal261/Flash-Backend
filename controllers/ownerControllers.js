import bcrypt from "bcrypt";
import {owner} from "../models/ownerModel.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

//POST /register
//Create a new owner
export const registerOwner = async(req, res)=>{
    const {name, DOB, phone, email, password} = req.body;

    try{
        const userhandle = name.toString() +nanoid(4);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOwner = await owner.create({name, DOB, phone, email, password:hashedPassword, ownerHandle:userhandle});

        if(!newOwner)
            throw new Error("Owner could not be created");

        res.status(201).json({newOwner});
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err.message);
        }
}

//POST /login
//Login user
export const loginOwner = async (req, res)=>{
    const {email, password} = req.body;

    try {
        const existingUser = await owner.findOne({email});

        if(!existingUser)
            throw new Error("User not found");

        if(await bcrypt.compare(password,existingUser.password))
        {
            const token=jwt.sign({owner:existingUser}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"3h"});
            res.status(200).json({token});
        }
        else{
            res.status(403).json("Invalid Credentials");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err.message);
    }
}

//GET /profile
//Shows the current user profile
export const getLoggedInUser= async(req, res)=>{
    try{
        const {_id}=req.owner;

        if(!_id)
            throw new Error("User logged Out");

        const loggedInUser = await owner.find({_id});

        if(!loggedInUser)
            throw new Error("User doesn't exist");

        res.status(200).json(loggedInUser);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);
    }
}