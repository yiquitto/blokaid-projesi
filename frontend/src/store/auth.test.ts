import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/auth.routes';
import { prismaMock } from './singleton';

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user and return a token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        walletAddress: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the prisma create call
      prismaMock.user.create.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('userId', '1');
      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    });
  });
});