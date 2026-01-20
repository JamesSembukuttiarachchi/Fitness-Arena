import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["gympkg", "appt"]
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming photo is stored as a URL
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export const Offer = mongoose.model('Offer', offerSchema);
