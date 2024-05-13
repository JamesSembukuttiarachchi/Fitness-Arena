import { PhysioAppointment } from '../models/physioApModel.js'; // Import the PhysioAppointment model

// Controller function to create a new physiotherapy appointment
export const createPhysioAppointment = async (req, res) => {
  try {
    const {
      physioName,
      fullName,
      contactNumber,
      email,
      selectedDate,
      selectedTime,
      selectedPkg,
      message
    } = req.body;
    const newAppointment = await PhysioAppointment.create({
      physioName,
      fullName,
      contactNumber,
      email,
      selectedDate,
      selectedTime,
      selectedPkg,
      message
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all physiotherapy appointments
export const getAllPhysioAppointments = async (req, res) => {
  try {
    const appointments = await PhysioAppointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single physiotherapy appointment by ID
export const getPhysioAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await PhysioAppointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Physiotherapy appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a physiotherapy appointment by ID
export const updatePhysioAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      physioName,
      fullName,
      contactNumber,
      email,
      selectedDate,
      selectedTime,
      selectedPkg,
      message
    } = req.body;
    const updatedAppointment = await PhysioAppointment.findByIdAndUpdate(
      id,
      {
        physioName,
        fullName,
        contactNumber,
        email,
        selectedDate,
        selectedTime,
        selectedPkg,
        message
      },
      { new: true }
    );
    if (!updatedAppointment) return res.status(404).json({ message: 'Physiotherapy appointment not found' });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a physiotherapy appointment by ID
export const deletePhysioAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await PhysioAppointment.findByIdAndDelete(id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Physiotherapy appointment not found' });
    res.status(200).json({ message: 'Physiotherapy appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
