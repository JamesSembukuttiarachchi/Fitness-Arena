import { DocAppointment } from "../models/docApModel.js"; // Import your Mongoose model

// Controller functions for CRUD operations

// Create a new doctor appointment
export const createDocAppointment = async (req, res) => {
  try {
    const { doctorName, fullName, contactNumber, email, selectedDate, selectedTime, message } =
      req.body;

    // Create a new instance of the DocAppointment model
    const newDocAppointment = new DocAppointment({
      doctorName,
      fullName,
      contactNumber,
      email,
      selectedDate,
      selectedTime,
      message,
    });

    // Save the new appointment to the database
    await newDocAppointment.save();

    res
      .status(200)
      .json({
        message: "Doctor appointment created successfully",
        data: newDocAppointment,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all doctor appointments
export const getAllDocAppointments = async (req, res) => {
  try {
    const docAppointments = await DocAppointment.find();
    res.status(200).json(docAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a doctor appointment by ID
export const updateDocAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorName, fullName, contactNumber, email, selectedDate, selectedTime, message } =
      req.body;

    const updatedDocAppointment = await DocAppointment.findByIdAndUpdate(
      id,
      {
        doctorName,
        fullName,
        contactNumber,
        email,
        selectedDate,
        selectedTime,
        message
      },
      { new: true }
    );

    if (!updatedDocAppointment) {
      return res.status(404).json({ message: "Doctor appointment not found" });
    }

    res
      .status(200)
      .json({
        message: "Doctor appointment updated successfully",
        data: updatedDocAppointment,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a doctor appointment by ID
export const deleteDocAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDocAppointment = await DocAppointment.findByIdAndDelete(id);

    if (!deletedDocAppointment) {
      return res.status(404).json({ message: "Doctor appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


