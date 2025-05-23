import mongoose from "mongoose";

import { config, isDev } from "./config";
import { createError } from "../middleware/errorHandler";

export async function db() {
  const connectionStrng = config.MONGODB_CLOUD_URL;

  // = isDev ? config.MONGODB_LOCAL_URL :
 
  try {
    await mongoose.connect(connectionStrng as string);
    console.info("Database successfully connected");
  } catch (err) {
    throw createError("DB_CONNECTION_FAILED");
  }
}
