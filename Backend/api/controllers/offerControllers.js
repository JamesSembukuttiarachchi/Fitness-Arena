import { Offer } from "../models/offerModel.js";

// Controller for creating new offer
async function createOffer(req, res) {
  try {
    const offerData = Array.isArray(req.body) ? req.body : [req.body];
    const createdOffers = [];

    for (const data of offerData) {
      const offer = new Offer(data);
      await offer.save();
      createdOffers.push(offer);
    }

    res.status(201).send(createdOffers);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Controller for fetching all offers
async function getAllOffers(req, res) {
  try {
    const offers = await Offer.find();
    res.send(offers);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Controller for fetching offer by ID
async function getOfferById(req, res) {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).send();
    }
    res.send(offer);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Controller for updating offer by ID
async function updateOfferById(req, res) {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!offer) {
      return res.status(404).send();
    }
    res.send(offer);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Controller for deleting offer by ID
async function deleteOfferById(req, res) {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).send();
    }
    res.send(offer);
  } catch (error) {
    res.status(500).send(error);
  }
}

export {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOfferById,
  deleteOfferById,
};
