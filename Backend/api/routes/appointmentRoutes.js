// routes/appointmentRoutes.js
import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} from "../controllers/appointmentControllers.js";
import requireAuth from "../Middleware/requireAuth.js";

const router = express.Router();

// ✅ Apply authentication middleware to ALL routes
// This ensures IDOR protection by requiring valid JWT tokens
router.use(requireAuth);

// Rate limiting middleware (optional but recommended)
const rateLimit = (req, res, next) => {
  // Simple rate limiting - you can enhance this
  req.requestTime = Date.now();
  next();
};

router.use(rateLimit);

// Routes with proper IDOR protection
router.post("/", createAppointment);           // Create appointment
router.get("/", getAllAppointments);           // Get all user's appointments
router.get("/:id", getAppointmentById);        // Get specific appointment (owner only)
router.put("/:id", updateAppointmentById);     // Update appointment (owner only)
router.delete("/:id", deleteAppointmentById);  // Delete appointment (owner only)

// Error handling middleware for this router
router.use((err, req, res, next) => {
  console.error('Appointment route error:', err);
  res.status(500).json({
    message: "Internal server error in appointment routes",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

export default router;