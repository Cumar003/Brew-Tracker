import { Request, Response, NextFunction } from "express";
import { logger } from "../services/loggerService";

const logRequest = (req: Request, _res: Response, next: NextFunction) => {
  const path = req.originalUrl; // Track the requested URL
  const userAgent = req.headers["user-agent"]; // Get the user agent (browser, OS)
  const userIp = req.ip || req.socket.remoteAddress; // Get user IP address

  logger.info(`Incoming request from ${userIp} - ${userAgent} to ${path}`);

  logger.debug(`Request body: ${JSON.stringify(req.body)}`);

  next();
};

export default logRequest;
