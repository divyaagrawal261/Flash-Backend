import bcrypt from "bcrypt";
import {player} from "../models/playerModel.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { slots } from "../models/slotModel.js";

//POST /register
//Create a new player
export const registerPlayer = async(req, res)=>{
    const {name, DOB, phone, email, password, perferredSports} = req.body;

    try{
        const userhandle = name.toString().split(" ")[0] +nanoid(4);
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
    const {email, password} = req.body;

    try {
        const existingUser = await player.findOne({email});

        if(!existingUser)
            throw new Error("User not found");

        if(await bcrypt.compare(password,existingUser.password))
        {
            const token=jwt.sign({player:existingUser}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"3h"});
            res.status(200).json({token});
        }
        else
        res.status(403).json("Invalid Credentials")
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

//PUT /book/:slotId
//Book the slot with the provided slotId
export const bookSlot = async(req, res) =>{
    const {slotId} = req.query;
    try{
        const existingSlot = await slots.findById(slotId);

        if(!existingSlot)
            res.status(404).json("Slot does not exist");

        const confirmedBookings = existingSlot.players.length;

        if(confirmedBookings == existingSlot.size)
            res.status(403).json("Slot full!");

        const {_id} = req.player;

        const loggedInPlayer = await player.findById(_id);

        console.log(loggedInPlayer)

        if (!loggedInPlayer.bookings) {
            loggedInPlayer.bookings = [];  // Initialize as an empty array
        }
        loggedInPlayer.bookings.push(slotId);

        if(!existingSlot.players)
            existingSlot.players=[]

        existingSlot.players.push(_id);

        await existingSlot.save();
        await loggedInPlayer.save();

        res.status(200).json("Slot booked successfully");
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);       
    }
}

//GET /bookings
//Show all bookings of a player
export const allSlots = async(req,res)=>{
    const {_id} = req.player;
    try{
        const bookedSlots = await player.findById(_id);
        
        if(!bookedSlots)
            res.status(404).json("Couldn't display slots");

        res.status(200).json(bookedSlots.bookings);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);        
    }
}