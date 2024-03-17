import express from 'express';
import {
    createBiographicData,
    getAllBiographicData,
    getBiographicDataById,
    updateBiographicDataById,
    deleteBiographicDataById
} from '../controllers/bioDataControllers.js';

const router = express.Router();

// POST route to create a new user's biographic data
router.post('/', createBiographicData);

// GET route to fetch all users' biographic data
router.get('/', getAllBiographicData);

// GET route to fetch a specific user's biographic data by ID
router.get('/:id', getBiographicDataById);

// PUT route to update a specific user's biographic data by ID
router.put('/:id', updateBiographicDataById);

// DELETE route to delete a specific user's biographic data by ID
router.delete('/:id', deleteBiographicDataById);

export default router;
