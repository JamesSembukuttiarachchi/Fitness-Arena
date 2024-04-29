import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    menuItemId: String,
    name: {
        type: String,
        Trim: true,
        required: true,

    },

    image: String,
    price: Number,
    quantity: Number,
    email : {
        type: String,
        true:true,
        required: true

    }
})

export const Carts = mongoose.model("cart", cartSchema)