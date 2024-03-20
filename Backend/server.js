import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import workoutRoutes from "./Routes/workouts.js";
import registerRoutes from "./Routes/register.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("hello world");
});

// Route handler
app.use("/api/workouts", workoutRoutes);
app.use("/api/register", registerRoutes);

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
