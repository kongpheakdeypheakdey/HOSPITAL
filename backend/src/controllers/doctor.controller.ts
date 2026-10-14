import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { doctorSchema } from '../validators/doctor.validator';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listDoctors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || '';
    const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;
    const status = (req.query.status as string) || '';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameKm: { contains: search } },
        { specialty: { contains: search } },
        { specialtyKm: { contains: search } },
      ];
    }

    if (departmentId) {
      where.departmentId = departmentId;
    }

    if (status) {
      where.status = status;
    }

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        include: {
          department: {
            select: { id: true, name: true, nameKm: true },
          },
        },
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      prisma.doctor.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({
      success: true,
      message: 'Doctors list retrieved successfully.',
      data: doctors,
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

export const getDoctorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    return res.json({
      success: true,
      message: 'Doctor details retrieved.',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = doctorSchema.parse(req.body);

    const doctor = await prisma.doctor.create({
      data: validated,
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_DOCTOR',
      entity: 'Doctor',
      entityId: doctor.id,
      details: `Added doctor ${doctor.name}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Doctor created successfully.',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const validated = doctorSchema.partial().parse(req.body);

    const doctor = await prisma.doctor.update({
      where: { id },
      data: validated,
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_DOCTOR',
      entity: 'Doctor',
      entityId: doctor.id,
      details: `Updated doctor ${doctor.name}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Doctor updated successfully.',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);

    await prisma.doctor.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_DOCTOR',
      entity: 'Doctor',
      entityId: id,
      details: `Deleted doctor ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Doctor deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
