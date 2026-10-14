import { Router } from 'express';
import {
  listDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', listDepartments);
router.get('/:id', getDepartmentById);

router.post('/', authenticate, authorize(['ADMIN', 'MANAGER']), createDepartment);
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), updateDepartment);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteDepartment);

export default router;
