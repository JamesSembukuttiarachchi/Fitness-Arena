import express from "express";
import { Order } from "../models/orderModel.js";
const router = express.Router();

// POST a new order
router.post("/", async (req, res) => {
  const order = new Order({
    orderId: req.body.orderId,
    purchaseDate: req.body.purchaseDate,
    items: req.body.items,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one order
router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

// PUT update an order
router.put("/:id", getOrder, async (req, res) => {
  if (req.body.orderId != null) {
    res.order.orderId = req.body.orderId;
  }
  if (req.body.purchaseDate != null) {
    res.order.purchaseDate = req.body.purchaseDate;
  }
  if (req.body.items != null) {
    res.order.items = req.body.items;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an order
router.delete("/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: "Deleted order" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
}

export default router;
