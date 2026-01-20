import { SCard } from "../models/saveCardModel.js";

export const createCard = async (req, res) => {
  try {
    const {
      cardName,
      cardType,
      cardNumber,
      nameOnCard,
      expiryMonth,
      expiryYear,
      cvv,
    } = req.body;
    const newCard = new SCard({
      cardName,
      cardType,
      cardNumber,
      nameOnCard,
      expiryMonth,
      expiryYear,
      cvv,
    });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCards = async (req, res) => {
  try {
    const cards = await SCard.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await SCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCardById = async (req, res) => {
  try {
    const {
      cardName,
      cardType,
      cardNumber,
      nameOnCard,
      expiryMonth,
      expiryYear,
      cvv,
    } = req.body;
    const updatedCard = await SCard.findByIdAndUpdate(
      req.params.id,
      { nameOnCard, cardType, cardNumber, expiryMonth, expiryYear, cvv },
      { new: true }
    );
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const deletedCard = await SCard.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
