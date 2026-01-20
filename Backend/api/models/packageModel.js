import mongoose from "mongoose";

const gymPackageSchema = mongoose.Schema({
  packageID: {
    type: String,
    required: true,
    unique: true,
  },
  packageType: {
    type: String,
    enum: ["standard", "promo"],
    required: true,
  },
  packagePrice: {
    type: Number,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  packageDescription: {
    type: String,
    required: true,
  },
  packagePerks: {
    type: [String],
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  validatePeriod: {
    type: Number,
    required: true,
  },
});

export const GymPackage = mongoose.model("GymPackage", gymPackageSchema);
