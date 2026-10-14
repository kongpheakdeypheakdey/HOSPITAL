import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  phone: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
});

export const createUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  role: z.enum(['ADMIN', 'MANAGER', 'STAFF', 'USER']).default('USER'),
  phone: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});
