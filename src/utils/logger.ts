import { format, createLogger, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint({ colorize: true })
  ),
  transports: [new transports.Console()],
});

const notificationLogger = createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: "src/logs/file.log",
    }),
  ],
});

export class LoggerWrapper {
  public static debug(message: unknown) {
    logger.debug(message);
  }
  public static error(message: unknown) {
    logger.error(message);
  }
  public static info(message: unknown, writeToFile = false) {
    writeToFile ? notificationLogger.info(message) : logger.info(message);
  }
}
