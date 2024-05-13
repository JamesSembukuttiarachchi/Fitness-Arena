// routes/appointmentRoutes.js
import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} from "../controllers/appointmentControllers.js";

const router = express.Router();

// Routes
router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointmentById);
router.delete("/:id", deleteAppointmentById);

export default router;
