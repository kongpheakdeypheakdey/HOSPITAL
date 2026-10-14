import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req: Request, res: Response) => {
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    const endpoint = req.originalUrl;

    try {
      await prisma.rateLimitLog.create({
        data: {
          ipAddress,
          endpoint,
          action: 'LOGIN_RATE_LIMIT_EXCEEDED',
        },
      });
    } catch (err) {
      logger.error('Failed to log rate limit event:', err);
    }

    res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please try again after 1 minute.',
      errors: ['Rate limit exceeded (5 requests per minute)'],
    });
  },
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req: Request, res: Response) => {
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    const endpoint = req.originalUrl;

    try {
      await prisma.rateLimitLog.create({
        data: {
          ipAddress,
          endpoint,
          action: 'API_RATE_LIMIT_EXCEEDED',
        },
      });
    } catch (err) {
      logger.error('Failed to log rate limit event:', err);
    }

    res.status(429).json({
      success: false,
      message: 'Too many requests. Please slow down.',
      errors: ['API rate limit exceeded'],
    });
  },
});
