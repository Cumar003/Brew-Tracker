import "./events";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

// Configs
import { db } from "./config/db";
import { config } from "./config/config";

// Services
import { logger } from "./services/loggerService";

// Middleware & Routes
import { router } from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

// Initialize dotenv for environment variables
dotenv.config();

const app = express();
const PORT = config.PORT;

// Connect to the database
db();

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: config.URL,
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Loggin middleware
// app.use(logRequest);

// Logging requests using morgan and winston
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Use routes defined in your router
app.use(router);

// Global error handler
app.use(errorHandler);

// Default route for testing
app.use("/", (_req: Request, res:Response, _next: NextFunction) => {
  res.send("hello world");
});

// Start the server)
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
