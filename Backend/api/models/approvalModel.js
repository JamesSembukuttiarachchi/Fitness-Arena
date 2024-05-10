import mongoose from "mongoose";
import { GymPackage } from "./packageModel.js";

const approvalSchema = mongoose.Schema({
  packageID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GymPackage",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  }
});

export const Approval = mongoose.model("approval", approvalSchema);
