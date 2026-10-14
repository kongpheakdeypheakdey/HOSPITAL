import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { appointmentSchema } from '../validators/appointment.validator';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';
    const doctorId = req.query.doctorId ? parseInt(req.query.doctorId as string) : undefined;
    const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { patientName: { contains: search } },
        { patientPhone: { contains: search } },
        { patientEmail: { contains: search } },
        { reason: { contains: search } },
      ];
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    if (doctorId) {
      where.doctorId = doctorId;
    }

    if (departmentId) {
      where.departmentId = departmentId;
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          doctor: { select: { id: true, name: true, nameKm: true, specialty: true } },
          department: { select: { id: true, name: true, nameKm: true } },
        },
        skip,
        take: limit,
        orderBy: { appointmentDate: 'desc' },
      }),
      prisma.appointment.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({
      success: true,
      message: 'Appointments list retrieved successfully.',
      data: appointments,
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

export const getAppointmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        department: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    return res.json({
      success: true,
      message: 'Appointment details retrieved.',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = appointmentSchema.parse(req.body);

    const appointment = await prisma.appointment.create({
      data: {
        patientName: validated.patientName,
        patientPhone: validated.patientPhone,
        patientEmail: validated.patientEmail || null,
        dob: validated.dob ? new Date(validated.dob) : null,
        gender: validated.gender || null,
        departmentId: validated.departmentId || null,
        doctorId: validated.doctorId || null,
        appointmentDate: new Date(validated.appointmentDate),
        preferredTime: validated.preferredTime || '09:00 AM',
        reason: validated.reason || null,
        status: validated.status || 'PENDING',
        userId: req.user?.id || null,
      },
      include: {
        doctor: { select: { id: true, name: true, specialty: true } },
        department: { select: { id: true, name: true } },
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_APPOINTMENT',
      entity: 'Appointment',
      entityId: appointment.id,
      details: `Created appointment for ${appointment.patientName}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { status, appointmentDate, preferredTime, doctorId, departmentId, reason } = req.body;

    const data: any = {};
    if (status !== undefined) data.status = status;
    if (appointmentDate !== undefined) data.appointmentDate = new Date(appointmentDate);
    if (preferredTime !== undefined) data.preferredTime = preferredTime;
    if (doctorId !== undefined) data.doctorId = doctorId;
    if (departmentId !== undefined) data.departmentId = departmentId;
    if (reason !== undefined) data.reason = reason;

    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      include: {
        doctor: { select: { id: true, name: true } },
        department: { select: { id: true, name: true } },
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_APPOINTMENT',
      entity: 'Appointment',
      entityId: id,
      details: `Updated appointment ID ${id} to status ${appointment.status}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Appointment updated successfully.',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    await prisma.appointment.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_APPOINTMENT',
      entity: 'Appointment',
      entityId: id,
      details: `Deleted appointment ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Appointment deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
