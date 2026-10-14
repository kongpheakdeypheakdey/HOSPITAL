import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), getDashboardSummary);

export default router;
