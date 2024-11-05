import express from "express";
import { getLoggedInUser, loginOwner, registerOwner } from "../controllers/ownerControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const Router = express.Router();

Router.post("/register", registerOwner)
    .post("/login", loginOwner)
    .get("/profile", validateToken, getLoggedInUser)

export default Router;