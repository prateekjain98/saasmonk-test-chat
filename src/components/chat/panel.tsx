import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { type ChangeEvent, useState, useRef, MutableRefObject } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useChat, useChatLoader } from "../../store";
import { showSendButtonFlow } from "../../utils/constants";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatMessage from "./message";
import { type PanelType } from "../../typing";
import { BeatLoader } from "react-spinners";
import { useMutation } from "react-query";
import { createMessage } from "../../api-client";
import ChatBox from "./chat-box";
import { MenuButtons } from "./menu";
import { ChatCreateBody } from "../../zod/message";
import ChatHeader from "./header";

type Props = {
  type?: PanelType;
  conversationId: MutableRefObject<string>;
};

const ChatPanel = ({ type = "user", conversationId }: Props) => {
  // Hooks and state variables
  const { flow } = useChat();
  const [meeting, setMeeting] = useState(false);

  const { loading, setLoading } = useChatLoader();
  const bottomElement = useRef<HTMLDivElement>(null);

  const [isHumanInConversation, setIsHumanInConversation] = useState(false);

  // controlled input value
  const [userMessage, setUserMessage] = useState("");

  const { mutate: createMessageMutate } = useMutation(createMessage);

  const chatsContainer = useRef<HTMLDivElement>(null);

  // Event handlers
  useCalendlyEventListener({
    onEventScheduled: () => {
      setMeeting(true);
    },
  });

  // Helper functions
  const messages = () => {
    switch (flow) {
      case "chat":
      case "faq":
        return (
          <div
            className={`sm-overflow-y-auto sm-pb-6 sm-scrollbar-hide ${
              type === "agent" ? "sm-max-h-[254px]" : "sm-max-h-[320px]"
            }`}
          >
            <ChatBox
              conversationId={conversationId}
              type={flow === "chat" ? "admin" : "bot"}
              setIsHumanInConversation={setIsHumanInConversation}
            />
          </div>
        );
      case "schedule":
        return (
          <>
            {meeting ? (
              <ChatMessage message="Your demo is scheduled. Please check your email for further details" />
            ) : (
              <div className="sm-max-h-[480px] sm-scroll-y-auto sm-scrollbar-hide">
                <InlineWidget url="https://calendly.com/amitav-sm/demo-for-saasmonk?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ff9300" />
              </div>
            )}
          </>
        );
      default:
        return <MenuButtons />;
    }
  };

  // on message Send function
  const onMessageSend = () => {
    if (!userMessage) return;
    const chatBody: ChatCreateBody = {
      conversationId: conversationId.current,
      message: userMessage,
      senderId: "test",
      isHumanInConversation: isHumanInConversation,
      type: "text",
    };
    createMessageMutate(chatBody);
    setLoading(true);
    setUserMessage("");
  };

  // on change for user input
  const handleUserMessageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="saasmonk-chat-panel"
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`sm-h-[500px] sm-w-[350px] sm-overflow-hidden sm-bg-white sm-shadow-lg !sm-z-[100000000000] ${
          type === "user"
            ? "sm-fixed sm-bottom-3 sm-right-3 sm-rounded-lg"
            : "sm-bottom-0 sm-rounded-t-lg"
        }`}
      >
        <ChatHeader type={type} />
        <div
          className="sm-overflow-y-auto sm-scrollbar-hide"
          ref={chatsContainer}
        >
          {messages()}
          {loading && <div className="sm-h-10"></div>}
          <div ref={bottomElement} />
        </div>
        <div>
          {loading && (
            <div className="sm-absolute sm-bottom-20 sm-left-4 sm-m-2">
              <BeatLoader color="#ff9300" loading={loading} size={10} />
            </div>
          )}
        </div>
        {(type === "agent" || showSendButtonFlow.includes(flow)) && (
          <div className="sm-absolute sm-bottom-3 sm-flex sm-w-full sm-gap-1 sm-p-4 sm-bg-white">
            <Input
              placeholder="Type your message here"
              value={userMessage}
              onChange={handleUserMessageInput}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  return onMessageSend();
                }
              }}
            />
            <Button className="sm-bg-primary-600" onClick={onMessageSend}>
              <Send size={16} color="white" />
            </Button>
          </div>
        )}
        {type === "user" && flow === "chat" && (
          <div className="sm-absolute sm-bottom-0  sm-flex sm-w-full sm-flex-row sm-items-center sm-justify-center sm-gap-1 sm-bg-white sm-p-1">
            <p className="sm-text-xs sm-font-semibold sm-text-gray-400 sm-m-0">
              Powered by
            </p>
            <div className="sm-relative">
              <img
                src="https://app.saasmonk.ai/images/brand/logo-gray.png"
                alt="Saasmonk Logo"
                width={75}
                height={10}
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatPanel;
