import { AppDataSource } from "../database/data-source.js";
import { Message } from "../entity/Message.js";

const messageRepository = AppDataSource.getRepository(Message);

export class MessageRepository {

  public async save(categoryId: any, content: string) {
    return await messageRepository.save({ categoryId, content });
  }

  // public async findById(id: any): Promise<Message | null> {
  //   return await messageRepository.findOneBy({ id });
  // }
}
