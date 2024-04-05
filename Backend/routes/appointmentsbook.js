import express from "express";

const router = express.Router();
import appoinment from "../models/appointment.js";

//create

// POST Method to add single or multiple appointments
router.post("/", async (req, res) => {
  try {
    const appoinmentData = req.body;
    if (Array.isArray(appoinmentData)) {
      // Insert multiple appointments
      const appoinments = await appoinments.insertMany(appoinmentData);
      res.status(201).json(appoinments);
    } else {
      // Insert single appointment
      const appoinment = await appoinment.create(appointmentData);
      res.status(201).json(appoinment);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET Method to retrieve all appointments
router.get("/", async (req, res) => {
  try {
    const appoinments = await appoinment.find();
    res.json(appoinments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Method to retrieve a single appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appoinment = await appoinment.findById(id);
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
    const updatedAppointment = await appoinment.findByIdAndUpdate(
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
    const deletedAppointment = await appoinment.findByIdAndDelete(id);
    res.json(deletedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
