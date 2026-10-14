import { Router } from 'express';
import {
  listBeds,
  createBed,
  updateBed,
  deleteBed,
} from '../controllers/bed.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', listBeds);
router.post('/', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), createBed);
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), updateBed);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteBed);

export default router;
