

import express from "express";

const router = express.Router();
import {appointment} from "../models/appointment.js";

//create

// POST Method to add single appointment
router.post("/", async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await appointment.create(appointmentData);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET Method to retrieve all appointments
router.get("/", async (req, res) => {
  try {
    const appoinments = await appointment.find();
    res.json(appoinments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Method to retrieve a single appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appoinment = await appointment.findById(id);
    if (!appoinment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appoinment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT Method to update an appointment by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAppointment = await appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Method to delete an appointment by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAppointment = await appointment.findByIdAndDelete(id);
    res.json(deletedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
