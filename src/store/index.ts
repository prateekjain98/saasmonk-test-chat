import { create } from "zustand";
import { type Flow } from "../typing";
import type { ChatLoadingState, ChatState } from "./typing";
import { immer } from "zustand/middleware/immer";

export const useChat = create<ChatState>()(
  immer((set) => ({
    // Bubble states
    bubbleVisible: true,
    setBubbleVisible: (visible: boolean) => set({ bubbleVisible: visible }),

    // Panel states
    panelVisible: false,
    setPanelVisible: (visible: boolean) => set({ panelVisible: visible }),

    // Menu states
    menuVisible: true,
    setMenuVisible: (visible: boolean) => set({ menuVisible: visible }),

    // Flow states
    flow: null,
    setFlow: (flow: Flow) => set({ flow: flow }),

    // Bot message states
    botMessages: [],
    addBotMessage: (message) =>
      set((state) => {
        state.botMessages.unshift(message);
      }),
    clearBotMessages: () => set({ botMessages: [] }),
  }))
);

export const useChatLoader = create<ChatLoadingState>()(
  immer((set) => ({
    // loading states
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
  }))
);
