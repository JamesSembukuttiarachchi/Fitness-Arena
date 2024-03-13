import mongoose from 'mongoose'


const workoutSchema= mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export const workout = mongoose.model('workout', workoutSchema)