// import { Photo } from "./entity/Photo"
// import { AppDataSource } from "

import { NotificationType } from "../config/index.js";
import { Category } from "../entity/Category.js";
import { Channel } from "../entity/Channel.js";
import { User } from "../entity/User.js";
import { AppDataSource } from "./data-source.js";

import { faker } from "@faker-js/faker";

const Categories = {
  SPORTS: "Sports",
  FINANCE: "Finance",
  MOVIES: "Movies",
};

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

    console.log("Channels: ", insertedChannels);

    // mock users

    const userRepository = AppDataSource.getRepository(User);

    const mockedPersonA = {
      name: "Pedro",
      email: "pedro@gmail.com",
      phoneNumber: faker.phone.number(),
    };
    const mockedPersonB = {
      name: "Ana",
      email: "ana@gmail.com",
      phoneNumber: faker.phone.number(),
    };
    const mockedPersonC = {
      name: "Lucas",
      email: "lucas@gmail.com",
      phoneNumber: faker.phone.number(),
    };
    const mockedPersonD = {
      name: "Laura",
      email: "laura@gmail.com",
      phoneNumber: faker.phone.number(),
    };

    await userRepository.save([
      {
        name: mockedPersonA.name,
        email: mockedPersonA.email,
        phoneNumber: mockedPersonA.phoneNumber,
        categorySubscriptions: [sports, finance, movies],
        notificationChannels: [smsChannel, emailChannel, pushChannel]
      },
      {
        name: mockedPersonB.name,
        email: mockedPersonB.email,
        phoneNumber: mockedPersonB.phoneNumber,
        categorySubscriptions: [sports, finance, movies],
        notificationChannels: [smsChannel, emailChannel, pushChannel]
      },
      {
        name: mockedPersonC.name,
        email: mockedPersonC.email,
        phoneNumber: mockedPersonC.phoneNumber,
        categorySubscriptions: [sports, finance, movies],
        notificationChannels: [smsChannel, emailChannel, pushChannel]
      },
      {
        name: mockedPersonD.name,
        email: mockedPersonD.email,
        phoneNumber: mockedPersonD.phoneNumber,
        categorySubscriptions: [sports, finance, movies],
      },
    ]);

    // await userRepository.save()

    // const firstName = faker.person.firstName();
    // const lastName = faker.person.lastName();
    // const name = `${firstName} ${lastName}`;
    // const email = faker.internet.email({
    //   firstName,
    //   lastName,
    // });
    // const phoneNumber = faker.phone.number();

    // await userRepository.insert([
    //   {
    //     name,
    //     email,
    //     phoneNumber,
    //     categorySubscriptions: [sports, finance, movies],
    //   },
    // ]);
  })
  .catch((error) => console.log(error));
