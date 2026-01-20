import express from "express";
const router = express.Router();
import { Trainer } from "../models/trainer.js";

// POST route to create a new trainer
router.post('/', (req, res) => {
  const { name, monday, tuesday, friday, sunday } = req.body;
  const newTrainer = new Trainer({ name, monday, tuesday, friday, sunday });

  newTrainer.save()
    .then(trainer => {
      res.status(201).json(trainer);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// GET route to fetch all trainers
router.get('/', (req, res) => {
  Trainer.find()
    .then(trainers => {
      res.json(trainers);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// GET route to fetch a single trainer by ID
router.get('/:id', (req, res) => {
  Trainer.findById(req.params.id)
    .then(trainer => {
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      res.json(trainer);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// PUT route to update a trainer's details
router.put('/:id', (req, res) => {
  const { name, monday, tuesday, friday, sunday } = req.body;
  Trainer.findByIdAndUpdate(req.params.id, { name, monday, tuesday, friday, sunday }, { new: true })
    .then(trainer => {
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      res.json(trainer);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE route to delete a trainer
router.delete('/:id', (req, res) => {
  Trainer.findByIdAndDelete(req.params.id)
    .then(trainer => {
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      res.json({ message: 'Trainer deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

export default router
