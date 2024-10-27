import express from "express";
import { deletePlayground, getSpecificPlayground, newPlayground, showAllPlaygrounds, showByOwner, updatePlayground } from "../controllers/playgroundControllers";

const Router = express.Router();

Router.get("/all", showAllPlaygrounds)
    .get("/detail/:id", getSpecificPlayground)
    .get("/owner/:id", showByOwner)

Router.use("/", validateToken)
    .post("/new", newPlayground)
    .delete("/delete/:id", deletePlayground)
    .put("/update/:id", updatePlayground)

export default Router;