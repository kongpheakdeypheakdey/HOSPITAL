import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { config } from '../config';
import { loginSchema, updateProfileSchema } from '../validators/auth.validator';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        errors: ['Authentication failed'],
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact administrator.',
        errors: ['Account deactivated'],
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        errors: ['Authentication failed'],
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Set HTTP-only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    await logAudit({
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      details: `User ${user.email} logged in successfully`,
      ipAddress,
    });

    return res.json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      await logAudit({
        userId: req.user.id,
        action: 'LOGOUT',
        entity: 'User',
        entityId: req.user.id,
        details: `User ${req.user.email} logged out`,
        ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
      });
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'lax',
    });

    return res.json({
      success: true,
      message: 'Logged out successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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

    return res.json({
      success: true,
      message: 'User profile retrieved successfully.',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const validatedData = updateProfileSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: validatedData,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        avatar: true,
        phone: true,
        updatedAt: true,
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'UPDATE_PROFILE',
      entity: 'User',
      entityId: req.user.id,
      details: 'User updated profile details',
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
