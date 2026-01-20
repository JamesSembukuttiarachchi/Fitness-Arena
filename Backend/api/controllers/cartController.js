import { Carts } from "../models/cartModel.js";

// Create a new cart item (linked to logged-in user)
export const createCartItem = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    const newCartItem = new Carts({
      menuItemId,
      quantity,
      userId: req.user._id, // secure
    });

    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ error: "Error creating cart item" });
  }
};

// Get carts of logged-in user
export const getMyCarts = async (req, res) => {
  try {
    const carts = await Carts.find({ userId: req.user._id }).populate("menuItemId");
    res.json(carts);
  } catch (error) {
    console.error("Error getting user carts:", error);
    res.status(500).json({ error: "Error getting user carts" });
  }
};

// Get cart item by ID (only if belongs to user)
export const getCartItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const cartItem = await Carts.findOne({
      _id: itemId,
      userId: req.user._id, // ownership check
    }).populate("menuItemId");

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    console.error("Error getting cart item:", error);
    res.status(500).json({ error: "Error getting cart item" });
  }
};

// Update cart item (only if belongs to user)
export const updateCartItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await Carts.findOneAndUpdate(
      { _id: itemId, userId: req.user._id }, // secure
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Error updating cart item" });
  }
};

// Delete cart item (only if belongs to user)
export const deleteCartItemById = async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const result = await Carts.findOneAndDelete({
      _id: cartItemId,
      userId: req.user._id, // secure
    });

    if (!result) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Error deleting cart item" });
  }
};
