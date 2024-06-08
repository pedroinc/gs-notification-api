import { AppDataSource } from "../database/data-source.js";
import { User } from "../entity/User.js";

const userRepository = AppDataSource.getRepository(User);

export class UserRepository {
  public async findByCategory(categoryId: any): Promise<User[]> {
    return await userRepository.find({
      relations: { categorySubscriptions: true },
      where: {
        categorySubscriptions: {
          id: categoryId,
        },
      },
    });
  }
}
