import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listDepartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string) || '';
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameKm: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const departments = await prisma.department.findMany({
      where,
      include: {
        _count: {
          select: { doctors: true, bedsList: true },
        },
      },
      orderBy: { id: 'asc' },
    });

    return res.json({
      success: true,
      message: 'Departments retrieved successfully.',
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const department = await prisma.department.findUnique({
      where: { id },
      include: {
        doctors: true,
        bedsList: true,
      },
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found.',
      });
    }

    return res.json({
      success: true,
      message: 'Department details retrieved.',
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, nameKm, code, description, descKm, head, beds, status, icon, image } = req.body;

    const department = await prisma.department.create({
      data: {
        name,
        nameKm,
        code,
        description,
        descKm,
        head,
        beds: beds || 20,
        occupancy: 0,
        status: status || 'open',
        icon,
        image,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_DEPARTMENT',
      entity: 'Department',
      entityId: department.id,
      details: `Created department ${department.name}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Department created successfully.',
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const department = await prisma.department.update({
      where: { id },
      data: req.body,
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_DEPARTMENT',
      entity: 'Department',
      entityId: department.id,
      details: `Updated department ${department.name}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Department updated successfully.',
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    await prisma.department.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_DEPARTMENT',
      entity: 'Department',
      entityId: id,
      details: `Deleted department ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Department deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
