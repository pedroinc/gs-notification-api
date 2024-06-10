import { AppDataSource } from "../database/data-source.js";
import { Category } from "../entity/Category.js";

const categoryRepository = AppDataSource.getRepository(Category);

export class CategoryRepository {
  public async fetchAll(): Promise<Category[]> {
    return await categoryRepository.find();
  }
  public async findById(id: number): Promise<Category | null> {
    return await categoryRepository.findOneBy({ id });
  }
}
