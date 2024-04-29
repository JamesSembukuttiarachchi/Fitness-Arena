import mongoose from "mongoose";

// Define the schema
const trainerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    monday: {
        type: String,
        default: ''
    },
    tuesday: {
        type: String,
        default: ''
    },
    friday: {
        type: String,
        default: ''
    },
    sunday: {
        type: String,
        default: ''
    }
});

// Create the model
export const Trainer = mongoose.model('Trainer', trainerSchema);


