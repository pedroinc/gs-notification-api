import { Categories, NotificationType } from "../config/index.js";
import { Category } from "../entity/Category.js";
import { Channel } from "../entity/Channel.js";
import { User } from "../entity/User.js";
import { AppDataSource } from "./data-source.js";

import { faker } from "@faker-js/faker";

AppDataSource.initialize()
  .then(async () => {
    const categoryRepository = AppDataSource.getRepository(Category);

    await categoryRepository.insert([
      { name: Categories.SPORTS },
      { name: Categories.FINANCE },
      { name: Categories.MOVIES },
    ]);

    const insertedCategories = await categoryRepository.find();
    const sports = insertedCategories.find(
      (item) => item.name === Categories.SPORTS
    ) as Category;
    const finance = insertedCategories.find(
      (item) => item.name === Categories.FINANCE
    ) as Category;
    const movies = insertedCategories.find(
      (item) => item.name === Categories.MOVIES
    ) as Category;

    console.log("Categories: ", insertedCategories);

    const channelRepository = AppDataSource.getRepository(Channel);

    await channelRepository.insert([
      { name: "SMS", tag: NotificationType.SMS },
      { name: "E-Mail", tag: NotificationType.EMAIL },
      { name: "Push Notification", tag: NotificationType.PUSH },
    ]);

    const insertedChannels = await channelRepository.find();
    const smsChannel = insertedChannels.find(
      (item) => item.tag === NotificationType.SMS
    ) as Channel;
    const emailChannel = insertedChannels.find(
      (item) => item.tag === NotificationType.EMAIL
    ) as Channel;
    const pushChannel = insertedChannels.find(
      (item) => item.tag === NotificationType.PUSH
    ) as Channel;

    const userRepository = AppDataSource.getRepository(User);

    await userRepository.save([
      {
        name: "Pedro",
        email: "pedro@gmail.com",
        phoneNumber: faker.phone.number(),
        categorySubscriptions: [sports, movies],
        notificationChannels: [emailChannel, pushChannel],
      },
      {
        name: "Ana",
        email: "ana@gmail.com",
        phoneNumber: faker.phone.number(),
        categorySubscriptions: [movies],
        notificationChannels: [pushChannel],
      },
      {
        name: "Lucas",
        email: "lucas@gmail.com",
        phoneNumber: faker.phone.number(),
        categorySubscriptions: [sports],
        notificationChannels: [emailChannel, pushChannel],
      },
      {
        name: "Laura",
        email: "laura@gmail.com",
        phoneNumber: faker.phone.number(),
        categorySubscriptions: [finance],
        notificationChannels: [emailChannel],
      },
      {
        name: "Nina",
        email: "nina@gmail.com",
        phoneNumber: faker.phone.number(),
        categorySubscriptions: [sports],
        notificationChannels: [smsChannel],
      },
    ]);
  })
  .catch((error) => console.log(error));
