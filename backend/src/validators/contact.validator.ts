import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const replyContactSchema = z.object({
  replyMessage: z.string().min(2, 'Reply message is required'),
});
