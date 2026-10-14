import { z } from 'zod';

export const doctorSchema = z.object({
  name: z.string().min(2, 'Doctor name is required'),
  nameKm: z.string().optional().nullable(),
  specialty: z.string().min(2, 'Specialty is required'),
  specialtyKm: z.string().optional().nullable(),
  departmentId: z.number().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  experience: z.string().optional().nullable(),
  languages: z.string().optional().nullable(),
  availability: z.string().optional().nullable(),
  status: z.enum(['active', 'inactive', 'on_leave']).optional().default('active'),
  image: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});
