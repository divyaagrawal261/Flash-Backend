import express from "express";
import validateToken from "../middlewares/validateTokenHandler.js";
import {
  allSlots,
  bookSlot,
  getLoggedInUser,
  loginPlayer,
  registerPlayer,
} from "../controllers/playerController.js";

const Router = express.Router();

Router.use("/", validateToken)
  .post("/register", registerPlayer)
  .post("/login", loginPlayer)
  .get("/profile", getLoggedInUser)
  .put("/book/:slotId", bookSlot)
  .get("/bookings", allSlots);

export default Router;
