import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
<<<<<<< HEAD
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Reference to the Item model
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

export const Carts = mongoose.model("crt", cartSchema);
=======
  menuItemId: String,
  name: {
    type: String,
    Trim: true,
    required: true,
  },

  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
    true: true,
    required: true,
  },
});

export const Carts = mongoose.model("cart", cartSchema);
>>>>>>> Minindi
