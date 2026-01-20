import { injur } from "../models/injuryModel.js";

// Controller for creating a new injury document
export const createInjury = async (req, res) => {
  try {
    const { type, injuryDescription, exercisesToAvoid, recoveryMethods } = req.body;
    const newInjury = new injur({
      type,
      injuryDescription,
      exercisesToAvoid,
      recoveryMethods
    });
    const savedInjury = await newInjury.save();
    res.status(201).json(savedInjury);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for retrieving all injury data
export const getAllInjuries = async (req, res) => {
  try {
    const injuries = await injur.find();
    res.json(injuries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for retrieving injury data by type
export const getInjuriesByType = async (req, res) => {
  const { type } = req.params;
  try {
    const injuries = await injur.find({ type });
    res.json(injuries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating injury details by ID
export const updateInjury = async (req, res) => {
  const { id } = req.params;
  const { type, injuryDescription, exercisesToAvoid, recoveryMethods } = req.body;
  try {
    const updatedInjury = await injur.findByIdAndUpdate(id, {
      type,
      injuryDescription,
      exercisesToAvoid,
      recoveryMethods
    }, { new: true });
    if (!updatedInjury) {
      return res.status(404).json({ message: 'Injury not found' });
    }
    res.json(updatedInjury);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for removing injury by ID
export const deleteInjury = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInjury = await injur.findByIdAndDelete(id);
    if (!deletedInjury) {
      return res.status(404).json({ message: 'Injury not found' });
    }
    res.json({ message: 'Injury deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
