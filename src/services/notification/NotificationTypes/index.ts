import { NotificationType } from "../../../config/index.js";
import { User } from "../../../entity/User.js";
import { Email } from "./Email.js";
import { Push } from "./Push.js";
import { Sms } from "./Sms.js";

export interface INotification {
  send(user: User, content: string): void;
}

export const channelMapper = {
  [NotificationType.EMAIL]: new Email(NotificationType.EMAIL),
  [NotificationType.PUSH]: new Push(NotificationType.PUSH),
  [NotificationType.SMS]: new Sms(NotificationType.SMS),
}
