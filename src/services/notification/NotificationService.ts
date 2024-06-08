import { CategoryRepository } from "../../repositories/CategoryRepository.js";
import { UserRepository } from "../../repositories/UserRepository.js";
import { LoggerWrapper } from "../../utils/logger.js";
import { channelMapper } from "./NotificationTypes/index.js";

const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();

interface RequestBody {
  categoryId: string;
  content: string;
}

export class SendNotificationService {

  async execute({ categoryId, content }: RequestBody) {
    if (!categoryId)
      throw Error(`The category id was not provided: ${categoryId}`);

    if (!content || !content.length) throw Error("The message cannot by empty");

    const category = await categoryRepository.findById(categoryId);

    if (!category) throw Error(`Invalid category id: ${categoryId}`);

    const usersToBeNotified = await userRepository.findByCategory(categoryId);

    // LoggerWrapper.info(category.name)

    usersToBeNotified.map(user => {
      user.notificationChannels?.map(channel => {
        // const logMessage = `sending to ${user.name} via ${channel.tag}`;
        // LoggerWrapper.info(logMessage);

        const notificationChannel = channelMapper[channel.tag];
        notificationChannel.send(user, content);

        // if(channel.tag === 'push') {
          
        //   const push = new Push(channel.tag);
        //   this.send(push, user);
        // }
        // const notification = new INotification();
      });
    })
    // return await messageRepository.save(categoryId, content);
  }
  // async send(notificationChannel: INotification, user: User) {
  //   notificationChannel.send(user);
  //   // console.log(notification.send);
  // }
}
