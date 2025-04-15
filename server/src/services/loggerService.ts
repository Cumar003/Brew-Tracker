import path from "path";
import chalk from "chalk";

import { Writable } from "stream";
import { logToDb } from "../models/logger";
import { createError } from "../middleware/errorHandler";
import { createLogger, format, transports, Logger } from "winston";

class DbStream extends Writable {
  constructor(options?: object) {
    super(options);
  }

  async _write(chunk: Buffer | string, _encoding: string, callback: (err?: Error) => void): Promise<void> {
    try {
      const logData = JSON.parse(chunk.toString());
      await logToDb(logData.level, logData.message, logData.metadata);
      callback();
    } catch (error) {
      createError("DB_FAILED_LOG");
      callback(error as Error);
    }
  }
}

const levelStyles: Record<string, (text: string) => string> = {
  error: (txt) => chalk.white.bold.bgRed(` ${txt.toUpperCase()} `),
  warn: (txt) => chalk.black.bold.bgYellow(` ${txt.toUpperCase()} `),
  info: (txt) => chalk.white.bold.bgCyan(` ${txt.toUpperCase()} `),
  http: (txt) => chalk.white.bold.bgBlue(` ${txt.toUpperCase()} `),
  debug: (txt) => chalk.white.bold.bgMagenta(` ${txt.toUpperCase()} `),
  verbose: (txt) => chalk.white.bold.bgGreen(` ${txt.toUpperCase()} `),
  silly: (txt) => chalk.black.bold.bgWhite(` ${txt.toUpperCase()} `),
};

class AppLogger {
  private logger: Logger;

  constructor() {
    const jsonFormat = format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.json()
    );

    const consoleFormat = format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(({ timestamp, level, message, metadata }) => {
        const colorLevel = levelStyles[level]?.(level) || level.toUpperCase();
        const time = chalk.gray(`[${timestamp}]`);
        const meta = metadata ? `\n${chalk.dim(JSON.stringify(metadata, null, 2))}` : "";
        return `${time} ${colorLevel} ${chalk.bold(message)}${meta}`;
      })
    );

    this.logger = createLogger({
      level: "debug",
      transports: [
        new transports.Console({ format: consoleFormat }),
        new transports.File({
          filename: path.join(__dirname, "../../logs/app.log"),
          level: "info",
          format: jsonFormat,
        }),
        new transports.Stream({
          stream: new DbStream(),
          format: jsonFormat,
        }),
      ],
    });
  }

  log(level: string, message: string, metadata?: any) {
    this.logger.log(level, message, { metadata });
  }

  info(message: string, metadata?: any) {
    this.log("info", message, metadata);
  }

  error(message: string, metadata?: any) {
    this.log("error", message, metadata);
  }

  warn(message: string, metadata?: any) {
    this.log("warn", message, metadata);
  }

  debug(message: string, metadata?: any) {
    this.log("debug", message, metadata);
  }

  verbose(message: string, metadata?: any) {
    this.log("verbose", message, metadata);
  }

  silly(message: string, metadata?: any) {
    this.log("silly", message, metadata);
  }
}

export const logger = new AppLogger();
