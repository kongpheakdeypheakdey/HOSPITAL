import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listBeds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = (req.query.status as string) || '';
    const wardName = (req.query.wardName as string) || '';
    const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;

    const where: any = {};
    if (status) where.status = status.toUpperCase();
    if (wardName) where.wardName = { contains: wardName };
    if (departmentId) where.departmentId = departmentId;

    const beds = await prisma.bed.findMany({
      where,
      include: {
        department: { select: { id: true, name: true, nameKm: true } },
      },
      orderBy: { bedNumber: 'asc' },
    });

    const totalBeds = beds.length;
    const occupiedBeds = beds.filter((b) => b.status === 'OCCUPIED').length;
    const availableBeds = beds.filter((b) => b.status === 'AVAILABLE').length;

    return res.json({
      success: true,
      message: 'Beds list retrieved successfully.',
      data: beds,
      summary: {
        totalBeds,
        occupiedBeds,
        availableBeds,
        occupancyRate: totalBeds ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createBed = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bedNumber, wardName, departmentId, status, patientName } = req.body;

    const bed = await prisma.bed.create({
      data: {
        bedNumber,
        wardName,
        departmentId: departmentId ? parseInt(departmentId, 10) : null,
        status: status || 'AVAILABLE',
        patientName: patientName || null,
        admittedAt: patientName ? new Date() : null,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_BED',
      entity: 'Bed',
      entityId: bed.id,
      details: `Created bed ${bed.bedNumber} in ward ${bed.wardName}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Bed created successfully.',
      data: bed,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBed = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { status, patientName, wardName, departmentId } = req.body;

    const data: any = {};
    if (status !== undefined) data.status = status;
    if (patientName !== undefined) {
      data.patientName = patientName;
      data.admittedAt = patientName ? new Date() : null;
    }
    if (wardName !== undefined) data.wardName = wardName;
    if (departmentId !== undefined) data.departmentId = departmentId;

    const bed = await prisma.bed.update({
      where: { id },
      data,
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_BED',
      entity: 'Bed',
      entityId: id,
      details: `Updated bed ${bed.bedNumber} status to ${bed.status}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Bed updated successfully.',
      data: bed,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBed = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    await prisma.bed.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_BED',
      entity: 'Bed',
      entityId: id,
      details: `Deleted bed ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Bed deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
