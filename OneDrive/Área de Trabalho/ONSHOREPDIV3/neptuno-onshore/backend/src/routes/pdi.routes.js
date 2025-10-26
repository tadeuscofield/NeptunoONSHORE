import express from 'express';
import { generatePDI, downloadPDI, getGeneratedPDIs } from '../controllers/pdi.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/generate/:projectId', generatePDI);
router.get('/download/:projectId', downloadPDI);
router.get('/list/:projectId', getGeneratedPDIs);

export default router;
