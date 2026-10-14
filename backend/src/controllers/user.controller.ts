import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { createUserSchema } from '../validators/auth.validator';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const role = (req.query.role as string) || '';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    if (role) {
      where.role = role.toUpperCase();
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          avatar: true,
          phone: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({
      success: true,
      message: 'Users retrieved successfully.',
      data: users,
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

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        avatar: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
        errors: ['Invalid user ID'],
      });
    }

    return res.json({
      success: true,
      message: 'User details retrieved.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = createUserSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(validated.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: validated.email.toLowerCase(),
        passwordHash,
        fullName: validated.fullName,
        role: validated.role,
        phone: validated.phone,
        avatar: validated.avatar,
        isActive: validated.isActive,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        avatar: true,
        phone: true,
        isActive: true,
        createdAt: true,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_USER',
      entity: 'User',
      entityId: newUser.id,
      details: `Created user ${newUser.email} with role ${newUser.role}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { fullName, phone, role, isActive, avatar } = req.body;

    const data: any = {};
    if (fullName !== undefined) data.fullName = fullName;
    if (phone !== undefined) data.phone = phone;
    if (role !== undefined) data.role = role;
    if (isActive !== undefined) data.isActive = isActive;
    if (avatar !== undefined) data.avatar = avatar;

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        avatar: true,
        phone: true,
        isActive: true,
        updatedAt: true,
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_USER',
      entity: 'User',
      entityId: id,
      details: `Updated user ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);

    // Prevent self deletion
    if (req.user?.id === id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own admin account.',
      });
    }

    await prisma.user.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_USER',
      entity: 'User',
      entityId: id,
      details: `Deleted user ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'User deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
