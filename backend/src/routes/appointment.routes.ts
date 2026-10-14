import { Router } from 'express';
import {
  listAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointment.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public / Patient appointment creation
router.post('/', createAppointment);

// Protected routes for hospital staff & admin
router.get('/', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), listAppointments);
router.get('/:id', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), getAppointmentById);
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), updateAppointment);
router.delete('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), deleteAppointment);

export default router;
