import express from "express";
//import { createServer } from "http"; // Import the 'createServer' function
//import { Server } from "socket.io"; // Import the 'Server' class from 'socket.io'
import { PORT, mongoDBUrl } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import packcageRoutes from "./api/routes/packageRoutes.js"
import approvalRoutes from "./api/routes/approvalRoutes.js"

const app = express();
//const server = createServer(app); // Create an HTTP server instance
//const io = new Server(server); // Create a new instance of the Socket.IO server

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.get("/", (req, res) => {
  return res.status(234).send("hello world");
});

// Route handler
app.use("/packages", packcageRoutes)
app.use("/approval", approvalRoutes)

// WebSocket event handlers
/*io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  // Handle custom events from clients
  socket.on("customEvent", (data) => {
    console.log("Received custom event:", data);
    // Process data and optionally emit a response or broadcast to other clients
  });

  
  // Example: Emitting approvalUpdate event
  socket.emit("approvalUpdate", updatedApprovals);
});*/

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
