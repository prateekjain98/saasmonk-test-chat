import { useEffect, useRef } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import ChatMessage from "../message";
import { type Sender } from "../../../typing";
import { format as formatDate } from "date-fns";
import DateTime from "../../common/date-time";
import { Chat } from "../../../typing/chat";
import { useMutation, useQuery } from "react-query";
import {
  createConversationParticipant,
  createMessage,
  getAllMessages,
} from "../../../api-client";
import { supabaseClient } from "../../../supabase/client";
import { tryingToConnectToHumanMessage } from "../../../utils/constants";
import { useChatLoader } from "../../../store";

type Props = {
  conversationId: MutableRefObject<string>;
  type: "bot" | "admin";
  setIsHumanInConversation: Dispatch<SetStateAction<boolean>>;
};
function ChatBox({ conversationId, setIsHumanInConversation, type }: Props) {
  const senderType = "test";
  const { setLoading } = useChatLoader();
  const { mutateAsync: createConversationParticipantMutate } = useMutation(
    createConversationParticipant
  );

  const bottomElement = useRef<HTMLDivElement>(null);
  let prevTimestamp: string = "";
  const { data: chats, refetch: refetchChats } = useQuery(
    conversationId.current,
    () => getAllMessages(conversationId.current)
  );
  // const { addBotMessage } = useChat();

  useEffect(() => {
    const messageInsertChangesChannel = supabaseClient.channel(
      "message-insert-changes"
    );

    const setChatSubscriber = (conversationId: string) => {
      // user message read only channel

      console.log(conversationId, "payload");

      messageInsertChangesChannel
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Message",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            console.log(payload, "payload");
            const chat = payload.new as Chat;
            if (
              chat.message === tryingToConnectToHumanMessage &&
              chat.sender_id === "botpress"
            ) {
              setIsHumanInConversation(chat.is_human_in_conversation);
            }
            // ! no need to add bot message here as we are already adding it in the chat widget on first render
            // if (chat.sender_id === "botpress") {
            //   addBotMessage(chat);
            // }
            refetchChats();
          }
        )
        .subscribe();
    };

    const initiateConversation = async () => {
      const userParticipant = createConversationParticipantMutate({
        conversationId: conversationId.current,
        userId: "test",
      });
      const otherParticipant = createConversationParticipantMutate({
        conversationId: conversationId.current,
        userId: type === "bot" ? "botpress" : "admin",
      });
      await Promise.all([userParticipant, otherParticipant]);
    };

    const subscribeToBotMessage = async () => {
      if (!chats?.length) {
        await initiateConversation();
      }
      refetchChats();

      setChatSubscriber(conversationId.current);
    };

    void subscribeToBotMessage();

    // !TODO add unsubscribe
    return () => {
      supabaseClient.removeChannel(messageInsertChangesChannel);
    };
  }, [supabaseClient]);

  useEffect(() => {
    if (!bottomElement.current) return;
    bottomElement?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats?.length]);

  useEffect(() => {
    if (
      chats &&
      ["botpress", "admin"].includes(chats[chats.length - 1]?.sender_id)
    ) {
      setLoading(false);
    }
  }, [chats]);

  const createUserMessage = async (message: string) => {
    if (!conversationId.current) return;
    await createMessage({
      conversationId: conversationId.current,
      senderId: "test",
      message,
      type: "text",
    });
  };

  return (
    <>
      {chats?.map((chat) => {
        let sender: Sender | undefined;
        switch (chat.sender_id) {
          case "admin":
            sender = "agent";
            break;
          case "botpress":
            sender = "bot";
            break;
          default:
            sender = "user";
        }
        const timestamp = formatDate(new Date(chat.timestamp), "EEE, MMM d");

        if (prevTimestamp === "" || prevTimestamp !== timestamp) {
          prevTimestamp = timestamp;
          return (
            <div key={chat.id}>
              <DateTime
                dateTime={new Date(chat.timestamp)}
                format="day-month-date"
              />
              <ChatMessage
                messageId={chat.id}
                message={chat.message ?? ""}
                sender={sender}
                direction={chat.sender_id === senderType ? "send" : "receive"}
                type={chat.type}
                buttonChoices={chat.choices}
                createUserMessage={createUserMessage}
                actionType={chat.action_type}
                bottomElement={bottomElement}
                actionCompleted={chat.action_completed}
              />
            </div>
          );
        } else {
          return (
            <ChatMessage
              messageId={chat.id}
              key={chat.id}
              message={chat.message ?? ""}
              sender={sender}
              direction={chat.sender_id === senderType ? "send" : "receive"}
              type={chat.type}
              buttonChoices={chat.choices}
              createUserMessage={createUserMessage}
              actionType={chat.action_type}
              bottomElement={bottomElement}
              actionCompleted={chat.action_completed}
            />
          );
        }
      })}
      <div ref={bottomElement} />
    </>
  );
}

export default ChatBox;
