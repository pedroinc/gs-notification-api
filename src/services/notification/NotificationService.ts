import { CategoryRepository } from "../../repositories/CategoryRepository.js";
import { UserRepository } from "../../repositories/UserRepository.js";
import { INotificationInfo, channelMapper } from "./NotificationTypes/index.js";

const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();

interface RequestBody {
  categoryId: number;
  content: string;
}

export class SendNotificationService {
  async execute({ categoryId, content }: RequestBody) {
    const category = await categoryRepository.findById(categoryId);

    if (!category) throw Error(`Invalid category id: ${categoryId}`);

    const usersToBeNotified = await userRepository.findByCategory(categoryId);

    usersToBeNotified.map((user) => {
      user.notificationChannels?.map((channel) => {
        const notificationChannelObj = channelMapper[channel.tag];

        const notificationInfo: INotificationInfo = {
          type: channel.tag,
          user: {
            id: user.id,
            name: user.name,
          },
          category: category.name,
          content,
        }

        notificationChannelObj.send(notificationInfo);
      });
    });
  }
}
