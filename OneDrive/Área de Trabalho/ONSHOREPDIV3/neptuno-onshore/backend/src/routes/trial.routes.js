import express from 'express';
import {
  requestTrialAccess,
  loginWithAccessCode,
  getTrialUsers
} from '../controllers/trial.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.post('/request', authLimiter, requestTrialAccess);
router.post('/login', authLimiter, loginWithAccessCode);

// Admin only
router.get('/users', authenticate, authorize('admin'), getTrialUsers);

export default router;
