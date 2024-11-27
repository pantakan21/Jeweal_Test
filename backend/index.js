import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import jewealRoute from "./routes/jewealRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
    return response.status(200).send("Website Opened");
})

app.use("/jeweals", jewealRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export default app;