import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';

export const listAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const action = (req.query.action as string) || '';
    const search = (req.query.search as string) || '';

    const skip = (page - 1) * limit;
    const where: any = {};

    if (action) where.action = action.toUpperCase();
    if (search) {
      where.OR = [
        { details: { contains: search } },
        { action: { contains: search } },
        { entity: { contains: search } },
        { ipAddress: { contains: search } },
      ];
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: { select: { id: true, email: true, fullName: true, role: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({
      success: true,
      message: 'Audit logs retrieved successfully.',
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
