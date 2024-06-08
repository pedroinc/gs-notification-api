import { User } from "../../../entity/User.js";
import { LoggerWrapper } from "../../../utils/logger.js";
import { INotification } from "./index.js";


export class Push implements INotification {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
  send(user: User): void {
    //TODO business logic to send push notifications
    const { name } = user;
    LoggerWrapper.info(`${this.type} notification to ${name}`, true);
  }
}
