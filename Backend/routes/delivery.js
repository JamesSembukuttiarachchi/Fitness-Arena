import express  from "express";
import {Delivery} from "../models/deliveryModel.js"
const router = express.Router()

// Create a new delivery
router.post('/', async (req, res) => {
    try {
      const delivery = await Delivery.create(req.body);
      res.status(201).json(delivery);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all deliveries
  router.get('/', async (req, res) => {
    try {
      const deliveries = await Delivery.find();
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a single delivery
  router.get('//:id', async (req, res) => {
    try {
      const delivery = await Delivery.findById(req.params.id);
      if (!delivery) {
        res.status(404).json({ message: 'Delivery not found' });
      } else {
        res.status(200).json(delivery);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a delivery
  router.put('//:id', async (req, res) => {
    try {
      const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!delivery) {
        res.status(404).json({ message: 'Delivery not found' });
      } else {
        res.status(200).json(delivery);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a delivery
  router.delete('//:id', async (req, res) => {
    try {
      const delivery = await Delivery.findByIdAndDelete(req.params.id);
      if (!delivery) {
        res.status(404).json({ message: 'Delivery not found' });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;