import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const env = process.env.NODE_ENV || 'development';
const jwtSecret = process.env.JWT_SECRET || (env === 'production' ? '' : 'luangme-hospital-jwt-secret-key-super-secure-2025');
const sessionSecret = process.env.SESSION_SECRET || (env === 'production' ? '' : 'luangme-hospital-secure-session-secret-key-2025');

if (env === 'production' && (!jwtSecret || !sessionSecret)) {
  throw new Error('JWT_SECRET and SESSION_SECRET must be configured in production.');
}

export const config = {
  env,
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret,
  sessionSecret,
};
