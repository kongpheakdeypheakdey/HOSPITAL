import { Router } from 'express';
import { login, logout, getMe, updateProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { loginRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', loginRateLimiter, login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);

export default router;
