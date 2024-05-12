import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/bioDataControllers.js';

const router = express.Router();

// Routes for CRUD operations
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
