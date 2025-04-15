import { IUser } from "../models/user";
import { createError } from "./errorHandler";
import { NextFunction, Request, Response } from "express";

export const authorizeRoles = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as IUser
    if (!user || !roles.includes(user.role)) {
      return next(createError("FORBIDDEN_ACCESS"));
    }
    next();
  };
};