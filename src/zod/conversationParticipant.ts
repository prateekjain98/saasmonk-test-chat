import { z } from "zod";

export const createConversationParticipantSchema = z.object({
  conversationId: z.string(),
  userId: z.string(),
});

export type CreateConversationParticipantSchema = z.infer<
  typeof createConversationParticipantSchema
>;
