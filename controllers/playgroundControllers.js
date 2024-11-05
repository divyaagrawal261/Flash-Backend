import { playground } from "../models/playgroundModel.js";

//GET /all
//List all playgrounds
export const showAllPlaygrounds = async (req, res) => {
    const { page } = req.query.params;
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
    const { id } = req.query.params;
    try {
        const result = await playground.findOne({ id });
        if (!result)
            throw new Error("Error displaying playground");

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
    const { id } = req.query.params
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
    const { id } = req.body;
    try {
        const deleted = await playground.findByIdAndDelete({ _id: id });
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
    const { name, location, timings, sports, price } = req.body;
    const  ownerId  = req.owner._id;
    try {
        const result = await playground.create({ name, timings, location, sports, price, ownerId });

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
    const { timings, sports, price, name, location } = req.body;
    const { ownerId } = req.owner._id;
    try {
        const result = await playground.findOneAndUpdate({ ownerId, name, location }, { $set: { timings, sports, price } });

        if (!result)
            throw new Error("Error updating playground");

        res.status(201).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}


// GET /search/:keyword
// Keyword-based search for a playground
export const searchPlayground = async (req, res) => {
    const { keyword } = req.query.params;
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