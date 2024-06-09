import { format, createLogger, transports } from "winston";
const { combine, timestamp, printf, prettyPrint } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  const mObj = { datetime: `${timestamp}`, level, ...message };
  return `${JSON.stringify(mObj)}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    prettyPrint({ colorize: true }),
  ),
  transports: [new transports.Console()],
});

const notificationLogger = createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: "logs/file.log",
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
