import { NotificationType } from "../../../config/index.js";
import { Email } from "./Email.js";
import { Push } from "./Push.js";
import { Sms } from "./Sms.js";

export interface INotification {
  send(notification: INotificationInfo): void;
}

export interface INotificationInfo {
  type: string;
  user: {
    id: string | number;
    name: string;
  };
  category: string;
  content: string;
}

export const channelMapper = {
  [NotificationType.EMAIL]: new Email(NotificationType.EMAIL),
  [NotificationType.PUSH]: new Push(NotificationType.PUSH),
  [NotificationType.SMS]: new Sms(NotificationType.SMS),
}
