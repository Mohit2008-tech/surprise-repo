import { db } from "./db";
import { messages, type CreateMessageRequest, type MessageResponse } from "@shared/schema";

export interface IStorage {
  getMessages(): Promise<MessageResponse[]>;
  createMessage(message: CreateMessageRequest): Promise<MessageResponse>;
}

export class DatabaseStorage implements IStorage {
  async getMessages(): Promise<MessageResponse[]> {
    return await db.select().from(messages);
  }

  async createMessage(message: CreateMessageRequest): Promise<MessageResponse> {
    const [created] = await db.insert(messages).values(message).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
