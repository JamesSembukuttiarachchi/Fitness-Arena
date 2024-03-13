import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import workoutRoutes from "./Routes/workouts.js"


//root
//foodstore123

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to the metal world");
});



  // Route handler
  app.use("/api/workouts", workoutRoutes);


//app.listen(PORT, () => {
//    console.log(`App is running on ${PORT}`);
//})

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });















