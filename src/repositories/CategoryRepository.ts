import { AppDataSource } from "../database/data-source.js";
import { Category } from "../entity/Category.js";

const categoryRepository = AppDataSource.getRepository(Category);

export class CategoryRepository {
  public async findById(id: any): Promise<Category | null> {
    return await categoryRepository.findOneBy({ id });
  }
}
