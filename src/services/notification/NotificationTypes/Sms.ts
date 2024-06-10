import { LoggerWrapper } from "../../../utils/logger.js";
import { INotification, INotificationInfo } from "./index.js";

export class Sms implements INotification {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
  send(notification: INotificationInfo): void {
    // Business logic to send sms notifications...

    LoggerWrapper.info(notification, true);
  }
}
