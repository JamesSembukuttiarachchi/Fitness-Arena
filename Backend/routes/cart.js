import express from 'express';
import { createCartItem, getCartsByEmail, getCartByMenuItemId, getAllCartItems, getCartItemById, updateCartItemById, deleteCartItemById } from '../controllers/cartController.js';

const router = express.Router();

// Routes for cart items
router.post('/', createCartItem); // Create a new cart item

router.get('/', getAllCartItems); // Get all cart items
router.get('/:id', getCartItemById); // Get a cart item by ID
router.get('/:email', getCartsByEmail);
router.get('/menu/:id', getCartByMenuItemId); // Get a cart item by menuItemId
router.put('/:id', updateCartItemById); // Update a cart item by ID
router.delete('/:id', deleteCartItemById); // Delete a cart item by ID

export default router;
