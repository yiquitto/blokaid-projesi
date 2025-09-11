import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import authRoutes from './api/routes/auth.routes';
// import donationRoutes from './api/routes/donation.routes'; // Henüz oluşturulmadı
// import packageRoutes from './api/routes/package.routes'; // Henüz oluşturulmadı
import { AppError } from './utils/errors';

dotenv.config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
});

const app = express();
const port = process.env.PORT || 3001;

// --- Middlewares ---
app.use(helmet()); // HTTP başlıklarını güvenli hale getirir
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// --- Health Check Route ---
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running!' });
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
// app.use('/api/donations', donationRoutes);
// app.use('/api/packages', packageRoutes);

// --- Global Error Handler ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  logger.info(`Backend server is running at http://localhost:${port}`);
});
