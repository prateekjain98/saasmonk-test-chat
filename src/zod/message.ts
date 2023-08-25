import { z } from "zod";
export const chatCreateBody = z.object({
  conversationId: z.string(),
  message: z.string(),
  senderId: z.string(),
  isHumanInConversation: z.boolean().optional(),
  type: z.enum(["text", "action"]),
});

export type ChatCreateBody = z.infer<typeof chatCreateBody>;
