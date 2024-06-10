import { open } from 'node:fs/promises';
import path from "path";

import { LoggerWrapper, logPath } from "../utils/logger.js";
import { fileURLToPath } from "node:url";
import { randomUUID } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FetchLogsService {
  async execute() {
    try {
      let logItems = [];
      const filePath = path.join(__dirname, '..', '..', logPath as string);
      const file = await open(filePath);

      for await (const line of file.readLines()) {
        const itemObj = JSON.parse(line);
        itemObj.id = randomUUID();
        logItems.unshift(itemObj as never);
      }
      return logItems;
    } catch (error) {
      LoggerWrapper.error(error);
    }
  }
}
