import express from "express";
import {
  createDocAppointment,
  getAllDocAppointments,
  updateDocAppointment,
  deleteDocAppointment,
} from "../controllers/docApControllers.js";

const router = express.Router();

// Route to create a new doctor appointment
router.post("/", createDocAppointment);

// Route to get all doctor appointments
router.get("/", getAllDocAppointments);

// Route to update a doctor appointment by ID
router.put("/:id", updateDocAppointment);

// Route to delete a doctor appointment by ID
router.delete("/:id", deleteDocAppointment);

export default router;
