import { Item } from "../models/itemModel.js";

// Create new item
export const createItem = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const newItem = new Item({
      name,
      category,
      price,
      image: req.file.path, // save file path
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating item" });
  }
};

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading items" });
  }
};
