import {slots} from "../models/slotModel.js";
import {playground} from "../models/playgroundModel.js";

//POST /new/:playgroundId
//Create a new slot
export const createSlot = async(req, res)=>{
    const {_id} = req.owner;
    const {playgroundId} = req.query;
    try{
        const existingPlayground = await playground.findById(playgroundId);
        
        if(!existingPlayground)
            throw new Error("Playground doesn't exist");
        
        if(existingPlayground.ownerId != _id)
            res.status(403).json("Owner is not authorized to create the slot");

        const {time, date, slotSize} = req.body;

        const newSlot = await slots.create({playgroundId, time, date, slotSize, ownerId:_id});

        if(!newSlot)
            throw new Error("Slot couldn't be created");

        existingPlayground.slots.push(newSlot._id);
        await existingPlayground.save();

        res.status(201).json({newSlot});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);
    }
}

//DELETE /delete/:slotId
//Delete an existing slot
export const deleteSlot = async(req, res)=>{
    const {_id} = req.owner;
    const slotId = req.query;
    try{
        if(await slots.findById(slotId))
            res.status(404).json("Slot doesn't exist");

        const existingSlot = await slots.findById(slotId);

        if(existingSlot.ownerId != _id)
            res.status(403).json("User is not authorized to delete the slot");

        const deletedSlot = await slots.findByIdAndDelete(slotId);

        if(!deletedSlot)
            throw new Error("Slot could not be deleted");

        res.status(200).json("Slot deleted successfully");
    } 
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);
    }
}

//GET /all/:playgroundId
//Show all slots for the given playground
export const showAllSlots = async(req, res) => {
    const {playgroundId} = req.query;

    try {
        const existingPlayground = await playground.findById(playgroundId);

        if (!existingPlayground)
            return res.status(404).json({message: "Playground does not exist"});

        const allSlots = await slots.find({playgroundId});

        if (!allSlots)
            return res.status(404).json({message: "Could not find slots"});

        const slotsWithPlaygroundName = allSlots.map(slot => ({
            ...slot.toObject(),
            playgroundName: existingPlayground.name
        }));

        const response = {
             
            slots: slotsWithPlaygroundName
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

//GET /details/:slotId
//Give detail view of a slot
export const slotDetail = async(req, res)=>{
    const {slotId} = req.query;
    try{
        const existingSlot = await slots.findById(slotId).populate("playgroundId ownerId");

        if(!existingSlot)
            res.status(404).json("Slot doesn't exist");

        res.status(200).json(existingSlot);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err.message);
    }
}