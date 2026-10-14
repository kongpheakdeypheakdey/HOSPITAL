import { Router } from 'express';
import { listAuditLogs } from '../controllers/audit.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize(['ADMIN']), listAuditLogs);

export default router;
