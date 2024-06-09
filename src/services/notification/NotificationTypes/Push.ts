import { User } from "../../../entity/User.js";
import { LoggerWrapper } from "../../../utils/logger.js";
import { INotification, INotificationInfo } from "./index.js";


export class Push implements INotification {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
  send(notification: INotificationInfo): void {
    // Business logic to send push notifications...

    LoggerWrapper.info(notification, true);
  }
}
