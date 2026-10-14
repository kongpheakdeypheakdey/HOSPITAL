import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listPartnerships = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = (req.query.type as string) || '';
    const search = (req.query.search as string) || '';

    const where: any = {};
    if (type && type !== 'All') where.type = type;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameKm: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const partnerships = await prisma.partnership.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return res.json({
      success: true,
      message: 'Partnerships retrieved successfully.',
      data: partnerships,
    });
  } catch (error) {
    next(error);
  }
};

export const createPartnership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, nameKm, type, country, icon, image, description, descKm } = req.body;

    const partnership = await prisma.partnership.create({
      data: {
        name,
        nameKm,
        type: type || 'Academic',
        country: country || 'International',
        icon,
        image,
        description,
        descKm,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_PARTNERSHIP',
      entity: 'Partnership',
      entityId: partnership.id,
      details: `Added partnership with ${partnership.name}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Partnership created successfully.',
      data: partnership,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePartnership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const partnership = await prisma.partnership.update({
      where: { id },
      data: req.body,
    });

    return res.json({
      success: true,
      message: 'Partnership updated successfully.',
      data: partnership,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePartnership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    await prisma.partnership.delete({ where: { id } });

    return res.json({
      success: true,
      message: 'Partnership deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
