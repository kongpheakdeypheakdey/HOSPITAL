import { prisma } from './prisma';
import { logger } from './logger';

export async function logAudit({
  userId,
  action,
  entity,
  entityId,
  details,
  ipAddress,
}: {
  userId?: number;
  action: string;
  entity?: string;
  entityId?: number;
  details?: string;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details,
        ipAddress,
      },
    });
  } catch (error) {
    logger.error('Failed to save audit log:', error);
  }
}
