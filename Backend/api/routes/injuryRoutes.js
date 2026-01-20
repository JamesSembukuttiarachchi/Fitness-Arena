import express from 'express';
import {
  createInjury,
  getAllInjuries,
  getInjuriesByType,
  updateInjury,
  deleteInjury
} from '../controllers/injuryControllers.js';

const router = express.Router();

// POST method to create a new injury document
router.post('/', createInjury);

// GET method to retrieve all injury data
router.get('/', getAllInjuries);

// GET method to retrieve injury data by type
router.get('/:type', getInjuriesByType);

// PUT method to update injury details by ID
router.put('/:id', updateInjury);

// DELETE method to remove injury by ID
router.delete('/:id', deleteInjury);

export default router;
