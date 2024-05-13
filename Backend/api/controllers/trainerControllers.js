// controllers/trainerController.js

import { Trainer } from "../models/trainer.js";

// Controller function to create a new trainer
export const createTrainer = async (req, res) => {
  try {
    const { name, monday, tuesday, friday, sunday } = req.body;
    const newTrainer = new Trainer({ name, monday, tuesday, friday, sunday });
    const trainer = await newTrainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to fetch all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to fetch a single trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a trainer's details
export const updateTrainerById = async (req, res) => {
  try {
    const { name, monday, tuesday, friday, sunday } = req.body;
    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, { name, monday, tuesday, friday, sunday }, { new: true });
    if (!updatedTrainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(updatedTrainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a trainer
export const deleteTrainerById = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
