import {GymPackage} from '../models/packageModel.js';
import upload from '../Middleware/multerMiddleware.js';

// POST - Create a new gym package
const createPackage = async (req, res) => {
    try {
        const newPackage = await GymPackage.create({
          ...req.body,
          photoURL: req.file.path // Save image file path
        });
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// GET - Retrieve all gym packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await GymPackage.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET - Retrieve a specific gym package by ID
const getPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const Package = await GymPackage.findById(id);
        if (!Package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(Package);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT - Update a gym package by ID
const updatePackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPackage = await GymPackage.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(updatedPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Delete a gym package by ID
const deletePackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPackage = await GymPackage.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createPackage, getAllPackages, getPackageById, updatePackageById, deletePackageById };
