import express from "express";
import { deletePlayground, getSpecificPlayground, newPlayground, searchPlayground, showAllPlaygrounds, showByOwner, updatePlayground } from "../controllers/playgroundControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const Router = express.Router();

Router.get("/all", showAllPlaygrounds)
    .get("/detail/:id", getSpecificPlayground)
    .get("/owner/:id", showByOwner)
    .get("/search/:keyword", searchPlayground)

Router.use("/", validateToken)
    .post("/new", newPlayground)
    .delete("/delete/:id", deletePlayground)
    .put("/update/:id", updatePlayground)

export default Router;