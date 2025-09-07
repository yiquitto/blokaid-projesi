import { Router } from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  registerUser
);

router.post('/login', [body('email').isEmail(), body('password').exists()], loginUser);

export default router;