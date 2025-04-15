import mongoose from "mongoose";

import { config } from "./config";
import { createError } from "../middleware/errorHandler";
import { logger } from "../services/loggerService";

export async function db() {
  try {
    await mongoose.connect(config.MONGODB_LOCAL_URL as string);
    logger.info("Database successfully connected");
  } catch (err) {
    throw createError("DB_CONNECTION_FAILED");
  }
}
