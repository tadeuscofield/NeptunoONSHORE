import express from 'express';
import {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument
} from '../controllers/document.controller.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../services/uploadService.js';

const router = express.Router();

router.use(authenticate);

router.post('/:projectId', upload.single('file'), uploadDocument);
router.get('/:projectId', getDocuments);
router.get('/:projectId/:id', getDocument);
router.delete('/:projectId/:id', deleteDocument);

export default router;
