import { z } from "zod";

export type ChatEvent = "INSERT" | "UPDATE" | "DELETE" | "*";

export type Chat = {
  id: string;
  message: string;
  conversation_id: string;
  sender_id: string;
  timestamp: Date;
  is_human_in_conversation: boolean;
};

const choiceSchema = z.object({ title: z.string(), value: z.string() });
export type Choice = z.infer<typeof choiceSchema>;

export type ActionType =
  | "webchat_visibility"
  | "custom_event"
  | "webchat_config"
  | "book_meeting"
  | null;

export type Message = {
  id: string;
  type: "text" | "action";
  message: string | null;
  trigger_event: string | null;
  action_type: ActionType;
  action_completed: boolean;
  choices: Choice[];
  conversation_id: string;
  sender_id: string;
  timestamp: Date;
  is_human_in_conversation: boolean;
};
