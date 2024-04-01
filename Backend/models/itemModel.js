import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    }
});

export const Item =mongoose.model('Item', itemSchema);

