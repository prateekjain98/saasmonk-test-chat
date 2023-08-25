import { useChat } from "../../store";
import ChatBubble from "./bubble";
import ChatPanel from "./panel";
import { useState, useEffect, useRef } from "react";
import HoverMessages from "./hover-messages";
import { useMutation } from "react-query";
import { createConversation } from "../../api-client";
import axios from "axios";
import { supabaseClient } from "../../supabase/client";
import { Chat } from "../../typing/chat";

declare const window: Window &
  typeof globalThis & {
    triggerSaasmonkBubble: () => void;
  };

const ChatWidget = () => {
  const { bubbleVisible, panelVisible, botMessages, addBotMessage } = useChat();

  const [loadBubble, setLoadBubble] = useState(false);

  const triggerBubble = async () => {
    await axios.post(
      import.meta.env.VITE_BOTPRESS_WEBHOOK,
      {
        type: "websiteElement.click",
        data: {
          userId: "test",
          conversationId: conversationId.current,
          elementId: "outbound-tab",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // await botpressClient.createEvent({
    //   type: "websiteElementClicked",
    //   payload: {
    //     origin: "website",
    //     userId: "test",
    //     conversationId: conversationId.current,
    //     elementId: "outbound-tab",
    //   },
    // });
    console.log("loaded");
    setLoadBubble(true);
  };
  // create a new conversation
  const { mutateAsync: createConversationMutate } =
    useMutation(createConversation);

  // controlled input value
  const conversationId = useRef<string>("");

  const sendAnalytics = () => {
    if (navigator.sendBeacon) {
      let saasmonkChatAnonymousID = "";
      if (localStorage.getItem("saasmonkChatAnonymousID")) {
        saasmonkChatAnonymousID = localStorage.getItem(
          "saasmonkChatAnonymousID"
        ) ?? "";
      } else {
        saasmonkChatAnonymousID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        localStorage.setItem(
          "saasmonkChatAnonymousID",
          saasmonkChatAnonymousID
        );
      }

      // Sending data to server
      const data = new FormData();
      data.append("visitor_id", saasmonkChatAnonymousID);
      data.append("page_title", document.title);
      navigator.sendBeacon("https://saasmonk-test-chat.vercel.app/api/visitor/add", data);
    }
  };

  useEffect(() => {
    sendAnalytics();
    const messageInsertChangesChannel = supabaseClient.channel(
      "message-insert-changes"
    );
    const createFirstConversation = async () => {
      const conversation = await createConversationMutate();
      conversationId.current = conversation?.id ?? "";

      messageInsertChangesChannel
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Message",
            filter: `conversation_id=eq.${conversation?.id}`,
          },
          (payload) => {
            console.log(payload, "payload");
            const chat = payload.new as Chat;
            if (chat.sender_id === "botpress") {
              addBotMessage(chat);
            }
          }
        )
        .subscribe();
    };
    createFirstConversation();

    return () => {
      supabaseClient.removeChannel(messageInsertChangesChannel);
    };
    // no need to add supabaseClient as a dependency as we want only one conversation to be created
  }, []);

  useEffect(() => {
    if (window) {
      window["triggerSaasmonkBubble"] = () =>
        triggerBubble().then(() => console.log(loadBubble));
    }
  }, []);

  return (
    <>
      {bubbleVisible && <ChatBubble />}
      {panelVisible && <ChatPanel conversationId={conversationId} />}
      {loadBubble && botMessages.length !== 0 ? <HoverMessages /> : null}
    </>
  );
};

export default ChatWidget;
