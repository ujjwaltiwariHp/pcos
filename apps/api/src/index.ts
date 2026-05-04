import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import authRoutes from './routes/auth';
import assessmentRoutes from './routes/assessments';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});

// app.use(limiter);

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is a Vercel deployment
    const isAllowed = allowedOrigins.includes(origin) || 
                     origin.endsWith('.vercel.app') ||
                     origin.includes('localhost:');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/auth', authRoutes);
apiRouter.use('/assessments', assessmentRoutes);
apiRouter.use('/admin', adminRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(port as number, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
