import express from 'express';

import {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} from '../controllers/itemController.js';
import upload from '../Middleware/multerMiddleware.js';

const router = express.Router();

// Routes for CRUD operations
router.post('/',upload.single('image'), createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', updateItemById);
router.delete('/:id', deleteItemById);

export default router;
