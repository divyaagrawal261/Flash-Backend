import express from "express";
import rateLimit from "express-rate-limit";
import { getLoggedInUser, loginOwner, registerOwner } from "../controllers/ownerControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const loginLimiter = rateLimit({
    windowsMs: 15*60*1000,
    max: 7,
    messsage: "Too many login attempts, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
  })
  
const Router = express.Router();

Router.post("/register", registerOwner)
.post("/login", loginLimiter, loginOwner)
Router.get("/profile", validateToken, getLoggedInUser)

export default Router;