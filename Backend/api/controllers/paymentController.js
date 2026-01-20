import { Payment } from "../models/paymentModel.js";

export const createPayment = async (req, res) => {
  try {
    const { carts } = req.body;

    // Check if carts array is provided
    if (!carts || carts.length === 0) {
      return res.status(400).json({ message: "Carts array is required" });
    }

    // Create the payment with provided carts
    const payment = await Payment.create({ carts });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentById = async (req, res) => {
  try {
    const { cartIds } = req.body; // Assuming cartIds is an array of cartIds
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { carts: cartIds }, // Update to carts
      { new: true }
    );
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePaymentById = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
