import { playground } from "../models/playgroundModel.js";

//GET /all
//List all playgrounds
export const showAllPlaygrounds = async (req, res) => {
    const { page } = req.query;
    const perPage = 9;
    try {
        const result = await playground.find().skip((page - 1) * perPage).limit(perPage);
        if (!result)
            throw new Error("Error displaying playgrounds");

        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}


//GET /detail/:id
//Get details of a particular playground
export const getSpecificPlayground = async (req, res) => {
    const { id } = req.query;
    try {
        const result = await playground.findById(id);
        if (!result)
            res.status(404).json("Playground doesn't exist");
        else
        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}


//GET /owner/:id
//List all playgrounds of a particular owner
export const showByOwner = async (req, res) => {
    const { id } = req.query;
    try {
        const result = await playground.find({ ownerId: id });
        if (!result)
            throw new Error("Error displaying playgrounds")

        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}


//DELETE /delete/:id
//Delete a particular playground
export const deletePlayground = async (req, res) => {
    const { id } = req.query;

    try {
        const deleted = await playground.findOneAndDelete({ _id: id, ownerId:req.owner._id });
        if (!deleted)
            throw new Error("Error in deleting the playground");

        res.status(200).json({ message: "Playground Successsfully Deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}


//POST /new
//Create a playground
export const newPlayground = async (req, res) => {
    const { name, location, timings, sports, price, type, imgUrl } = req.body;
    const  ownerId  = req.owner._id;
    try {
        const result = await playground.create({ name, timings, location, sports, price, ownerId, type, imgUrl });

        if (!result)
            throw new Error("Error creating playground");

        res.status(201).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}


//PUT /update/:id
//Update a playground
export const updatePlayground = async (req, res) => {
    const { timings, sports, price, name} = req.body;
    const {id}=req.query;

    try {
        const result = await playground.findOneAndUpdate({_id:id, ownerId:req.owner._id}, { $set: { name, timings, sports, price } });

        if (!result)
            throw new Error("Error updating playground");

        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}


// GET /search/:keyword
// Keyword-based search for a playground
export const searchPlayground = async (req, res) => {
    const { keyword } = req.query;
    try {
        const playgrounds = await playground.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } }, 
                { location: { $regex: keyword, $options: 'i' } },
                { sports : {$regex: keyword, $options: 'i'} }, 
            ]
        });

        if (playgrounds.length === 0)
            throw new Error("No playgrounds found");

        res.status(200).json(playgrounds);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}