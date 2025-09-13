import express from 'express';
import { sendNotification } from '../controllers/notificationController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// @route   POST /api/admin/notifications/send
// @desc    Send notification to users
// @access  Private (Admin only)
router.post('/send', sendNotification);

export default router;
