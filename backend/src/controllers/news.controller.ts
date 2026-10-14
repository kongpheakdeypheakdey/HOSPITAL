import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../utils/audit';

export const listNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = (req.query.category as string) || '';
    const search = (req.query.search as string) || '';

    const skip = (page - 1) * limit;
    const where: any = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { titleKm: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.news.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({
      success: true,
      message: 'News list retrieved successfully.',
      data: news,
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

export const getNewsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const newsItem = await prisma.news.findUnique({ where: { id } });

    if (!newsItem) {
      return res.status(404).json({
        success: false,
        message: 'News article not found.',
      });
    }

    return res.json({
      success: true,
      message: 'News article retrieved.',
      data: newsItem,
    });
  } catch (error) {
    next(error);
  }
};

export const createNews = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, titleKm, category, categoryKm, date, description, descKm, content, image, author } = req.body;

    const newsItem = await prisma.news.create({
      data: {
        title,
        titleKm,
        category: category || 'Hospital News',
        categoryKm,
        date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description,
        descKm,
        content,
        image,
        author: author || 'Luang Mè Communications',
      },
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_NEWS',
      entity: 'News',
      entityId: newsItem.id,
      details: `Created news article "${newsItem.title}"`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'News article created successfully.',
      data: newsItem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const newsItem = await prisma.news.update({
      where: { id },
      data: req.body,
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_NEWS',
      entity: 'News',
      entityId: id,
      details: `Updated news article "${newsItem.title}"`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'News article updated successfully.',
      data: newsItem,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    await prisma.news.delete({ where: { id } });

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_NEWS',
      entity: 'News',
      entityId: id,
      details: `Deleted news article ID ${id}`,
      ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    });

    return res.json({
      success: true,
      message: 'News article deleted successfully.',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
