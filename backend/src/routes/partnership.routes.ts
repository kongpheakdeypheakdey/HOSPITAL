import { Router } from 'express';
import {
  listPartnerships,
  createPartnership,
  updatePartnership,
  deletePartnership,
} from '../controllers/partnership.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', listPartnerships);
router.post('/', authenticate, authorize(['ADMIN', 'MANAGER']), createPartnership);
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), updatePartnership);
router.delete('/:id', authenticate, authorize(['ADMIN']), deletePartnership);

export default router;
