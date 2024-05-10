import express from "express";
import {
  createPhysioAppointment,
  getAllPhysioAppointments,
  getPhysioAppointmentById,
  updatePhysioAppointmentById,
  deletePhysioAppointmentById,
} from "../controllers/physioApController.js";

const router = express.Router();

// Route to create a new physiotherapy appointment
router.post("/", createPhysioAppointment);

// Route to get all physiotherapy appointments
router.get("/", getAllPhysioAppointments);

// Route to get a physiotherapy appointment by ID
router.get("/:id", getPhysioAppointmentById);

// Route to update a physiotherapy appointment by ID
router.put("/:id", updatePhysioAppointmentById);

// Route to delete a physiotherapy appointment by ID
router.delete("/:id", deletePhysioAppointmentById);

export default router;
