import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import deliveryRoutes from "./routes/delivery.js";
import cardRoutes from "./routes/card.js";
import saveCardRoutes from "./routes/saveCard.js";
import cartRoutes from "./routes/cart.js"
import paymentRoutes from "./routes/payment.js"

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("hello world");
});

// Route handler
app.use("/delivery", deliveryRoutes);
app.use("/card", cardRoutes);
app.use("/savecard", saveCardRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);

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
