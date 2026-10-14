import { Router } from 'express';
import {
  listDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes for website visitors
router.get('/', listDoctors);
router.get('/:id', getDoctorById);

// Protected administrative routes
router.post('/', authenticate, authorize(['ADMIN', 'MANAGER']), createDoctor);
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), updateDoctor);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteDoctor);

export default router;
