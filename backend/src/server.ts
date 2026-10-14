import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { prisma } from './utils/prisma';

async function startServer() {
  try {
    await prisma.$connect();
    logger.info('Connected successfully to SQLite database via Prisma ORM.');

    app.listen(config.port, () => {
      logger.info(`Luang Mè Hospital Backend API server listening on http://localhost:${config.port}`);
      logger.info(`Environment: ${config.env}`);
    });
  } catch (error) {
    logger.error('Failed to start backend server:', error);
    process.exit(1);
  }
}

startServer();
