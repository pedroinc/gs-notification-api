import { User } from "../../../entity/User.js";
import { LoggerWrapper } from "../../../utils/logger.js";
import { INotification } from "./index.js";

export class Sms implements INotification {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
  send(user: User, content: string): void {
    //TODO business logic to send sms notifications
    const { name } = user;

    const messageInfo = {
      notification: this.type,
      user: name,
      content,
    }
    LoggerWrapper.info(messageInfo, true);
  }
}
