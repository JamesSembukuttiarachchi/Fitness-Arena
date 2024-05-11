import { Carts } from "../models/cartModel.js";

// Controller function to create a new cart item
export const createCartItem = async (req, res) => {
  try {
    const { menuItemId, quantity, email } = req.body;
    const newCartItem = new Carts({ menuItemId, quantity, email });
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ error: "Error creating cart item" });
  }
};

// Controller function to get carts by email
export const getCartsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const carts = await Carts.find({ email }).populate("menuItemId");
    res.json(carts);
  } catch (error) {
    console.error("Error getting carts by email:", error);
    res.status(500).json({ error: "Error getting carts by email" });
  }
};

// Controller function to retrieve all cart items
export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Carts.find().populate("menuItemId");
    res.json(cartItems);
  } catch (error) {
    console.error("Error reading cart items:", error);
    res.status(500).json({ error: "Error reading cart items" });
  }
};

// Controller function to get a cart item by its ID
export const getCartItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const cartItem = await Carts.findById(itemId).populate("menuItemId");
    if (!cartItem) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }
    res.json(cartItem);
  } catch (error) {
    console.error("Error getting cart item:", error);
    res.status(500).json({ error: "Error getting cart item" });
  }
};

// Controller function to get a cart item by menuItemId
export const getCartByMenuItemId = async (req, res) => {
  const menuItemId = req.params.id;
  try {
    const cartItem = await Carts.findOne({ menuItemId });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json(cartItem);
  } catch (error) {
    console.error("Error getting cart item:", error);
    res.status(500).json({ error: "Error getting cart item" });
  }
};

// Controller function to update a cart item by its ID
export const updateCartItemById = async (req, res) => {
  const itemId = req.params.id;
  const updatedCartItem = req.body;
  try {
    const result = await Carts.findByIdAndUpdate(itemId, updatedCartItem, {
      new: true,
    });
    if (!result) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Error updating cart item" });
  }
};

// Controller function to delete a cart item by its ID
export const deleteCartItemById = async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const result = await Carts.findByIdAndDelete(cartItemId);
    if (!result) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }
    res.json(result);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Error deleting cart item" });
  }
};
