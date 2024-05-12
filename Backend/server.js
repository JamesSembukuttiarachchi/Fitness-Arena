import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import ItemRoutes from "./api/routes/item.js";
import CartRoutes from "./api/routes/cart.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'))


app.get("/", (req, res) => {
  return res.status(234).send("hello world");
});

// Route handler
app.use("/product", ItemRoutes);
app.use("/carts", CartRoutes);

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