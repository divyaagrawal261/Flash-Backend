import express from "express";
import validateToken from "../middlewares/validateTokenHandler.js";
import rateLimit from "express-rate-limit";
import {
  allSlots,
  bookSlot,
  getLoggedInUser,
  loginPlayer,
  registerPlayer,
} from "../controllers/playerController.js";

const Router = express.Router();

const loginLimiter = rateLimit({
  windowsMs: 15*60*1000,
  max: 7,
  messsage: "Too many login attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
})

Router.post("/register", registerPlayer)
.post("/login", loginLimiter, loginPlayer)

Router.use("/", validateToken)
  .get("/profile", getLoggedInUser)
  .put("/book", bookSlot)
  .get("/bookings", allSlots);

export default Router;
