import { Feedback } from "../models/feedbackModel.js";
import mongoose from "mongoose";
 
// Controller for creating new feedback
async function createFeedback(req, res) {
    try {
      const feedbackData = Array.isArray(req.body) ? req.body : [req.body];
      const createdFeedbacks = [];
 
      for (const data of feedbackData) {
        const feedback = new Feedback(data);
        await feedback.save();
        createdFeedbacks.push(feedback);
      }
 
      res.status(201).send(createdFeedbacks);
    } catch (error) {
      res.status(400).send(error);
    }
  }
 
// Controller for fetching all feedback
async function getAllFeedback(req, res) {
  try {
    const feedback = await Feedback.find();
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
}
 
// Controller for fetching feedback by ID
async function getFeedbackById(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send();
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
}
 
// Controller for updating feedback by ID
async function updateFeedbackById(req, res) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback) {
      return res.status(404).send();
    }
    res.send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
}
 
// Controller for deleting feedback by ID
async function deleteFeedbackById(req, res) {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).send();
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
}
 
export {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};