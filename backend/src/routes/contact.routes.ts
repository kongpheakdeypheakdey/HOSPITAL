import { Router } from 'express';
import {
  submitInquiry,
  listInquiries,
  replyInquiry,
  deleteInquiry,
} from '../controllers/contact.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', submitInquiry);
router.get('/', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), listInquiries);
router.post('/:id/reply', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), replyInquiry);
router.delete('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), deleteInquiry);

export default router;
