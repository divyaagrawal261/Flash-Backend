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

Router.post("/register", registerPlayer)
.post("/login", loginPlayer)

Router.use("/", validateToken)
  .get("/profile", getLoggedInUser)
  .put("/book", bookSlot)
  .get("/bookings", allSlots);

export default Router;
