import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  nameOnCard: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

export const Card = mongoose.model('Card', cardSchema);

