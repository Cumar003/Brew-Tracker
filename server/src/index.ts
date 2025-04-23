import "./events";

import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";

// Configs
import { db } from "./config/db";
import { config } from "./config/config";

// Services

// Middleware & Routes
import { router } from "./routes";
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


// Router
app.use(router);

// Global error handler
app.use(errorHandler);

// Default route for testing
app.use("/", (req, res) => {
  res.send("hello world");
});

// Start the server
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
