import { Chat } from "~/typing/chat";
import type { Conversation, Flow } from "../typing";

export interface ChatState {
  bubbleVisible: boolean;
  setBubbleVisible: (visible: boolean) => void;
  panelVisible: boolean;
  setPanelVisible: (visible: boolean) => void;
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  flow: Flow;
  setFlow: (flow: Flow) => void;
  botMessages: Chat[];
  addBotMessage: (message: Chat) => void;
  clearBotMessages: () => void;
}
export interface InboxState {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
}

export interface ChatLoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
