import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt';
import { AppError } from '../utils/errors';
import prisma from '../utils/prismaClient';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, walletAddress } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, walletAddress },
    });

    const token = signToken(user.id);
    res.status(201).json({ token, userId: user.id });
  } catch (error) {
    // Handle potential unique constraint violation for email
    next(new AppError('User with this email already exists.', 409));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new AppError('Invalid credentials.', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials.', 401));
    }

    const token = signToken(user.id);
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    next(error);
  }
};