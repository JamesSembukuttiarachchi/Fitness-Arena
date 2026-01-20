import { Delivery } from "../models/deliveryModel.js";

export const createDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      res.status(404).json({ message: "Delivery not found" });
    } else {
      res.status(200).json(delivery);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!delivery) {
      res.status(404).json({ message: "Delivery not found" });
    } else {
      res.status(200).json(delivery);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      res.status(404).json({ message: "Delivery not found" });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
