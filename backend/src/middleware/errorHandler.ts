import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(message: string, statusCode: number = 400, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error processing ${req.method} ${req.url}:`, err);

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please check the submitted fields.',
      errors: formattedErrors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [err.message],
    });
  }

  // Handle Prisma unique constraint error (P2002)
  if (err.code === 'P2002') {
    const fields = err.meta?.target ? (err.meta.target as string[]).join(', ') : 'field';
    return res.status(409).json({
      success: false,
      message: `Conflict error. Duplicate entry for ${fields}.`,
      errors: [`A record with this ${fields} already exists.`],
    });
  }

  // Handle Prisma record not found (P2025)
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Requested record was not found.',
      errors: ['Record does not exist.'],
    });
  }

  // Default 500 server error
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: [err.message || 'An unexpected error occurred on the server.'],
  });
};
