import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    enum: ["Master", "Visa", "AmericanExpress"],
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  expiryMonth: {
    type: String,
    required: true,
  },
  expiryYear: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

export const SCard = mongoose.model("SaveCard", cardSchema);
