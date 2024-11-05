import express from "express";
import {
  createSlot,
  deleteSlot,
  showAllSlots,
} from "../controllers/slotControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const Router = express.Router();

Router.get("/all/:playgroundId", showAllSlots);
Router.use("/", validateToken)
  .post("/new/:playgroundId:slotId", createSlot)
  .delete("/delete/:slotId", deleteSlot);

export default Router;
