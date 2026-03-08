import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type CreateMessageRequest, type MessageResponse } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useMessages() {
  return useQuery({
    queryKey: [api.messages.list.path],
    queryFn: async () => {
      const res = await fetch(api.messages.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      return parseWithLogging(api.messages.list.responses[200], data, "messages.list");
    },
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMessageRequest) => {
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = parseWithLogging(api.messages.create.responses[400], resData, "messages.create.error");
          throw new Error(error.message);
        }
        throw new Error("Failed to create message");
      }
      return parseWithLogging(api.messages.create.responses[201], resData, "messages.create.success");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path] });
    },
  });
}
