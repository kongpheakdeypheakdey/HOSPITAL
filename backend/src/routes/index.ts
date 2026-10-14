import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import doctorRoutes from './doctor.routes';
import departmentRoutes from './department.routes';
import appointmentRoutes from './appointment.routes';
import bedRoutes from './bed.routes';
import contactRoutes from './contact.routes';
import newsRoutes from './news.routes';
import partnershipRoutes from './partnership.routes';
import dashboardRoutes from './dashboard.routes';
import auditRoutes from './audit.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
router.use('/departments', departmentRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/beds', bedRoutes);
router.use('/contacts', contactRoutes);
router.use('/news', newsRoutes);
router.use('/partnerships', partnershipRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/audit-logs', auditRoutes);

export default router;
