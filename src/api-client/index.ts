import { ChatCreateBody } from "~/zod/message";
import { apiInstance } from "./axios";
import { CreateConversationParticipantSchema } from "~/zod/conversationParticipant";
import { Message } from "~/typing/chat";
import { Conversation } from "~/typing";
import {
  createConversationParticipantRoute,
  createConversationRoute,
  createMessageRoute,
  getAllMessagesRoute,
  setActionCompletedRoute,
} from "./api-route";

export const createMessage = async (chat: ChatCreateBody) => {
  try {
    await apiInstance.post(createMessageRoute, chat);
  } catch (error) {
    console.error(error);
  }
};

export const createConversation = async () => {
  try {
    const response = await apiInstance.post<{ conversation: Conversation }>(
      createConversationRoute
    );

    return response.data.conversation;
  } catch (error) {
    console.error(error);
  }
};
export const createConversationParticipant = async (
  body: CreateConversationParticipantSchema
) => {
  try {
    await apiInstance.post(createConversationParticipantRoute, body);
  } catch (error) {
    console.error(error);
  }
};

export const getAllMessages = async (conversationId: string) => {
  try {
    const response = await apiInstance.get<{ messages: Message[] }>(
      getAllMessagesRoute,
      {
        params: { conversationId },
      }
    );
    return response.data.messages;
  } catch (error) {
    console.error(error);
  }
};

export const setActionCompleted = async (messageId: string) => {
  try {
    await apiInstance.put(setActionCompletedRoute, { messageId });
  } catch (error) {
    console.error(error);
  }
}
