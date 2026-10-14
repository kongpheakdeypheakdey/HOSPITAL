import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'luangme-hospital-jwt-secret-key-super-secure-2025',
  sessionSecret: process.env.SESSION_SECRET || 'luangme-hospital-secure-session-secret-key-2025',
};
