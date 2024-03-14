import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    items: [orderItemSchema]
});

export const Order = model('Order', orderSchema);


