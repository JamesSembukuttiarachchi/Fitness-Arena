import { Item } from '../models/itemModel.js';
import upload from '../Middleware/multerMiddleware.js'

// Controller function to create a new item
export const createItem = async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: req.file.path // Save image file path
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Error creating item' });
  }
};

// Controller function to retrieve all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error reading items:', error);
    res.status(500).json({ error: 'Error reading items' });
  }
};

// Controller function to get an item by its ID
export const getItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error('Error getting item:', error);
    res.status(500).json({ error: 'Error getting item' });
  }
};

// Controller function to update an item by its ID
export const updateItemById = async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    const result = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });
    if (!result) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(result);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Error updating item' });
  }
};

// Controller function to delete an item by its ID
export const deleteItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await Item.findByIdAndDelete(itemId);
    if (!result) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(result);
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item' });
  }
};
