import mongoose from "mongoose";
import { createError } from "../middleware/errorHandler";

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: Date,
  metadata: mongoose.Schema.Types.Mixed,
});

const Log = mongoose.model("Log", logSchema);

export const logToDb = async (level: string, message: string, metadata: any) => {
  try {
    const log = new Log({
      level,
      message,
      timestamp: new Date(),
      metadata,
    });

    await log.save();
  } catch (error) {
    throw createError("DB_FAILED_LOG")
  }
};
