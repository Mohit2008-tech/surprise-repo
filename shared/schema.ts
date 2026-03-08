import { z } from "zod";

// In-memory schema (no database required)
export interface Message {
  id: number;
  content: string;
}

export const insertMessageSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type CreateMessageRequest = InsertMessage;
export type MessageResponse = Message;
