import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";

class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  [key: string]: any;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    extra?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    if (extra && typeof extra === "object") {
      Object.assign(this, extra);
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (type: keyof typeof ERROR_MESSAGES, extra ?: Record<string, any>) => {
  const err = ERROR_MESSAGES[type] || ERROR_MESSAGES.SERVER_ERROR;
  return new AppError(err.message, err.statusCode, err.errorCode, extra);
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(`\x1b[41m[Error] ${err.message}\x1b[0m`);

  const { message, statusCode, errorCode, ...extra } = err;

  res.status(err.statusCode || 500).json({
    success: false,
    message: message || "Internal server error",
    errorCode: errorCode || "UNKNOWN",
    statusCode: statusCode || 500,
    ...extra,
  });
};
