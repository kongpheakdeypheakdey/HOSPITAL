import { z } from 'zod';

export const appointmentSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required'),
  patientPhone: z.string().min(6, 'Valid phone number is required'),
  patientEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  dob: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  departmentId: z.number().optional().nullable(),
  doctorId: z.number().optional().nullable(),
  appointmentDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Valid appointment date is required'),
  preferredTime: z.string().optional().nullable(),
  reason: z.string().optional().nullable(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']).optional().default('PENDING'),
});
