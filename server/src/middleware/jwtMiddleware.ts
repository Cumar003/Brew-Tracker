import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../config/config';
import { createError } from './errorHandler';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JwtUtils } from '../utils/jwtUtils';

export const jwtMiddleware: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) throw createError('JWT_EXPIRED_TOKEN');

  try {
    const decrypted = JwtUtils.decryptToken(token);
    if (!decrypted) throw createError('INVALID_ENCRYPTED_TOKEN');

    const decoded = jwt.verify(decrypted, config.JWT_SECRET as Secret) as { id: string, email: string, username: string, role: string };
    if(!decoded) throw createError('JWT_INVALID_TOKEN');

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role
    };

    next(); 
  } catch (err) {
    next(createError('JWT_INVALID_TOKEN'));
  }
};
