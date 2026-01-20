import {Approval} from "../models/approvalModel.js";

// POST - Create a new subscription
const createSubscription = async (req, res) => {
  try {
    const newSubscription = await Approval.create(req.body);
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET - Retrieve all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Approval.find().populate("packageID");
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Retrieve a specific subscription by ID
const getSubscriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await Approval.findById(id).populate("packageID");
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - Update a subscription by ID
const updateSubscriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSubscription = await Approval.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete a subscription by ID
const deleteSubscriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSubscription = await Approval.findByIdAndDelete(id);
    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscriptionById,
  deleteSubscriptionById,
};
