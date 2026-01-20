import mongoose from "mongoose";

const injurySchema = mongoose.Schema({
    type: {
      type: String,
      enum: ['chest', 'shoulders', 'arms', 'legs', 'back', 'abs'],
      required: true
    },
    injuryDescription: {
      type: String,
      required: true
    },
    exercisesToAvoid: {
      type: [String]
    },
    recoveryMethods: {
      type: [String]
    }
  });

  export const injur = mongoose.model('injury', injurySchema)