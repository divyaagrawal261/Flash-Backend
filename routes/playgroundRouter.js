import express from "express";
import { deletePlayground, getSpecificPlayground, newPlayground, searchPlayground, showAllPlaygrounds, showByOwner, updatePlayground } from "../controllers/playgroundControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const Router = express.Router();

Router.get("/all", showAllPlaygrounds)
    .get("/detail", getSpecificPlayground)
    .get("/owner", showByOwner)
    .get("/search", searchPlayground)

Router.use("/", validateToken)
    .post("/new", newPlayground)
    .delete("/delete", deletePlayground)
    .put("/update", updatePlayground)

export default Router;