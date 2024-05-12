import express from 'express';
import {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackageById,
    deletePackageById
} from '../controllers/packageControllers.js';
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

// POST - Create a new gym package
router.post('/', upload.single('photoURL'), createPackage);

// GET - Retrieve all gym packages
router.get('/', getAllPackages);

// GET - Retrieve a specific gym package by ID
router.get('/:id', getPackageById);

// PUT - Update a gym package by ID
router.put('/:id', updatePackageById);

// DELETE - Delete a gym package by ID
router.delete('/:id', deletePackageById);

export default router;
