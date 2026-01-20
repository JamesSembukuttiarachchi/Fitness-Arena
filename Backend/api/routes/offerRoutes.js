import express from "express";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOfferById,
  deleteOfferById,
} from "../controllers/offerControllers.js";
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

// Routes for offers
router.post("/",upload.single('image'), createOffer); // Create a new offer
router.get("/", getAllOffers); // Get all offers
router.get("/:id", getOfferById); // Get an offer by ID
router.put("/:id", updateOfferById); // Update an offer by ID
router.delete("/:id", deleteOfferById); // Delete an offer by ID

export default router;
