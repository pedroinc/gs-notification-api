import { CategoryRepository } from "../repositories/CategoryRepository.js";

const categoryRepository = new CategoryRepository()

export class FetchCategoriesService {
  async execute() {
    return await categoryRepository.fetchAll();
  }
}
