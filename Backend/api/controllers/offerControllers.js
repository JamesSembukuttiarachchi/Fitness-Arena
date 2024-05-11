import { Offer } from '../models/offerModel.js';
import upload from "../middleware/multerMiddleware.js";

// Controller function to create a new offer
export const createOffer = async (req, res) => {
  try {
    let imagePath = ""; // Initialize imagePath

    // Check if a file was uploaded
    if (req.file && req.file.path) {
      imagePath = req.file.path; // Save image file path
    }

    const newOffer = new Offer({
      name: req.body.name,
      discount: req.body.discount,
      category: req.body.category,
      description: req.body.description,
      image: imagePath, // Use imagePath
    });
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    console.error("Error creating Offer:", error);
    res.status(500).json({ error: "Error creating Offer" });
  }
};


// Controller function to get all offers
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    console.error('Error getting offers:', error);
    res.status(500).json({ error: 'Error getting offers' });
  }
};

// Controller function to get an offer by ID
export const getOfferById = async (req, res) => {
  const offerId = req.params.id;
  try {
    const offer = await Offer.findById(offerId);
    if (!offer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }
    res.json(offer);
  } catch (error) {
    console.error('Error getting offer by ID:', error);
    res.status(500).json({ error: 'Error getting offer by ID' });
  }
};

// Controller function to update an offer by ID
export const updateOfferById = async (req, res) => {
  const offerId = req.params.id;
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, req.body, { new: true });
    if (!updatedOffer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }
    res.json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer by ID:', error);
    res.status(500).json({ error: 'Error updating offer by ID' });
  }
};

// Controller function to delete an offer by ID
export const deleteOfferById = async (req, res) => {
  const offerId = req.params.id;
  try {
    const deletedOffer = await Offer.findByIdAndDelete(offerId);
    if (!deletedOffer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }
    res.json(deletedOffer);
  } catch (error) {
    console.error('Error deleting offer by ID:', error);
    res.status(500).json({ error: 'Error deleting offer by ID' });
  }
};
