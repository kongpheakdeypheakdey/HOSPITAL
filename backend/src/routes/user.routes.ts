import { Router } from 'express';
import {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['ADMIN', 'MANAGER']), listUsers);
router.get('/:id', authorize(['ADMIN', 'MANAGER']), getUserById);
router.post('/', authorize(['ADMIN']), createUser);
router.put('/:id', authorize(['ADMIN']), updateUser);
router.delete('/:id', authorize(['ADMIN']), deleteUser);

export default router;
