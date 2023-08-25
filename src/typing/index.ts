export type Flow = "chat" | "schedule" | "faq" | null;
export type Sender = "bot" | "agent" | "user";
export type DateTimeFormat = "date-month" | "day-time" | "day-month-date";
export type DateDisplayVariants = "chat" | "inbox";
export type PanelType = "user" | "agent";

export interface Conversation {
  id: string;
  createdAt: Date;
}
