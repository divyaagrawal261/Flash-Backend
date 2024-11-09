import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnect.js";
import cors from "cors";
import ownerRoutes from "./routes/ownerRouter.js";
import playerRoutes from "./routes/playerRouter.js";
import playgroundRoutes from "./routes/playgroundRouter.js";
import slotRoutes from "./routes/slotsRouter.js";

dotenv.config();

connectDb();
const app=express();

const port=process.env.PORT; 

app.use(express.json());
app.use(cors());


app.listen(port,()=>{
    console.log(`Server is listening on the port ${port}...`);
});

app.get("/health", async(req, res)=>
{
    console.log("Server is working fine");
    res.status(200).json({message:"Server is working fine"});
})
app.use("/player", playerRoutes);
app.use("/playground", playgroundRoutes);
app.use("/owner", ownerRoutes);
app.use("/slot", slotRoutes);