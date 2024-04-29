import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  getFeedbacksByEmail
} from "../controllers/feedbackControllers.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/:email", getFeedbacksByEmail);
router.get("/", getAllFeedback);
router.get("/:id", getFeedbackById);
router.put("/:id", updateFeedbackById);
router.delete("/:id", deleteFeedbackById);


export default router;
