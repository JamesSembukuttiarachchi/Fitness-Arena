
import express from 'express';
import {Item} from '../models/itemModel.js'
const router = express.Router()

// POST a new item
router.post('/', async (req, res) => {
    const item = new Item({
        itemId:req.body.itemId,
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        description: req.body.description,
        price: req.body.price,
        photoUrl: req.body.photoUrl
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one item
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});


// PUT update an item
router.put('/:id', getItem, async (req, res) => {
    if (req.body.itemId != null) {
        res.item.itemId = req.body.itemId;
    }
    if (req.body.itemName != null) {
        res.item.itemName = req.body.itemName;
    }
    if (req.body.itemType != null) {
        res.item.itemType = req.body.itemType;
    }
    if (req.body.description != null) {
        res.item.description = req.body.description;
    }
    if (req.body.price != null) {
        res.item.price = req.body.price;
    }
    if (req.body.photoUrl != null) {
        res.item.photoUrl = req.body.photoUrl;
    }

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an item
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Deleted item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

export default router