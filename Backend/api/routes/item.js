import express from 'express';
import { createItem, getAllItems } from '../controllers/itemController.js';
import upload from '../Middleware/multerMiddleware.js';

const router = express.Router();

// POST: create a new item with image
router.post('/', upload.single('image'), createItem);

// GET: get all items
router.get('/', getAllItems);

export default router;
