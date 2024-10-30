import bcrypt from "bcrypt";
import {player} from "../models/playerModel.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

//POST /register
//Create a new player
export const registerPlayer = async(req, res)=>{
    const {name, DOB, phone, email, password, perferredSports} = req.body;

    try{
        const userhandle = name.toString() +nanoid(4);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPlayer = await player.create({name, DOB, phone, email, password:hashedPassword, perferredSports, userhandle});

        if(!newPlayer)
            throw new Error("Player could not be created");

        res.status(201).json({newPlayer});
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json(err.message);
        }
}

//POST /login
//Login user
export const loginPlayer = async (req, res)=>{
    const {email, phone, password} = req.body;

    try {
        const existingUser = await player.findOne({email}) || await player.findOne({phone});

        if(!existingUser)
            throw new Error("User not found");

        if(await bcrypt.compare(existingUser.password, password))
        {
            const token=jwt.sign({existingUser}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"3h"});
            res.status(200).json({token});
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
        const {_id}=req.player;

        if(!_id)
            throw new Error("User logged Out");

        const loggedInUser = await player.find({_id});

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

//POST /book/:playgroundId
//Book a playground
export const bookAVenue = async(req, res)=>{
    const {playgroundId}=req.query.params;
    const {_id} = req.player;
    try{
        const requestingPlayer = await player.findById(_id);
        const requestedPlayround = await 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);
    }
}