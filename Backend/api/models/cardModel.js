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
  expiryMonth: {
    type: String,
    required: true
  },
  expiryYear: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  
});

export const Card = mongoose.model('Card', cardSchema);

