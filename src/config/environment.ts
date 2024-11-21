import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

interface Config {
  port: number;
  nodeEnv: string;
  dbUri: string;
  jwtSecret: string;
  emailUser: string;
  emailPassword: string;
  googleClientId: string;
  googleClientSecret: string;
  googleRefreshToken: string;
  googleRedirectUri: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-tracker',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  emailUser: process.env.EMAIL_USER || 'your-email@example.com',
  emailPassword: process.env.EMAIL_PASSWORD || 'your-email-password',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
};

export default config; 