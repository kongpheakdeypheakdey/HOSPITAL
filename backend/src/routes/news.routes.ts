import { Router } from 'express';
import {
  listNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/news.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', listNews);
router.get('/:id', getNewsById);

router.post('/', authenticate, authorize(['ADMIN', 'MANAGER']), createNews);
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), updateNews);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteNews);

export default router;
