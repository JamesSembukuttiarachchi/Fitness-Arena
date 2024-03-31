import express from 'express';
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOfferById,
  deleteOfferById,
} from '../controllers/offerControllers.js';

const router = express.Router();

// Routes for creating a new offer
router.post('/', createOffer);

// Routes for fetching all offers
router.get('/', getAllOffers);

// Routes for fetching offer by ID
router.get('/:id', getOfferById);

// Routes for updating offer by ID
router.put('/:id', updateOfferById);

// Routes for deleting offer by ID
router.delete('/:id', deleteOfferById);

export default router;
