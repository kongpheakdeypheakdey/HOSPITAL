import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { contactSchema, replyContactSchema } from '../validators/contact.validator';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const submitInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = contactSchema.parse(req.body);

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validated.name,
        email: validated.email.toLowerCase(),
        phone: validated.phone || null,
        subject: validated.subject,
        message: validated.message,
        status: 'UNREAD',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been received. Our hospital team will get back to you shortly.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const listInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';

    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ];
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const [inquiries, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactInquiry.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({
      success: true,
      message: 'Contact inquiries retrieved successfully.',
      data: inquiries,
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

export const replyInquiry = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const validated = replyContactSchema.parse(req.body);

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: {
        replyMessage: validated.replyMessage,
        repliedAt: new Date(),
        status: 'REPLIED',
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'REPLY_INQUIRY',
      entity: 'ContactInquiry',
      entityId: id,
      details: `Replied to contact inquiry from ${inquiry.email}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Reply saved and sent successfully.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    await prisma.contactInquiry.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_INQUIRY',
      entity: 'ContactInquiry',
      entityId: id,
      details: `Deleted contact inquiry ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'Inquiry deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
