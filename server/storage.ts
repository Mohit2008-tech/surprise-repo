import { type CreateMessageRequest, type MessageResponse } from "@shared/schema";

export interface IStorage {
  getMessages(): Promise<MessageResponse[]>;
  createMessage(message: CreateMessageRequest): Promise<MessageResponse>;
}

// In-memory storage implementation
export class InMemoryStorage implements IStorage {
  private messages: MessageResponse[] = [];
  private nextId = 1;

  async getMessages(): Promise<MessageResponse[]> {
    return [...this.messages]; // Return a copy
  }

  async createMessage(message: CreateMessageRequest): Promise<MessageResponse> {
    const newMessage: MessageResponse = {
      id: this.nextId++,
      content: message.content,
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

export const storage = new InMemoryStorage();
