import express from "express";
import {
  createSlot,
  deleteSlot,
  showAllSlots,
  slotDetail,
} from "../controllers/slotControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const Router = express.Router();

Router.get("/all", showAllSlots)
  .get("/details", slotDetail);
Router.use("/", validateToken)
  .post("/new", createSlot)
  .delete("/delete", deleteSlot);

export default Router;
