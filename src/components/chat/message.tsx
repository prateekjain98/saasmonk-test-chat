import { cva } from "class-variance-authority";
import { type Sender } from "../../typing";
import { Button } from "../ui/button";
import { ActionType, Choice } from "../../typing/chat";
import { MutableRefObject, useEffect, useState } from "react";
import { useChat, useChatLoader } from "../../store";
import { setActionCompleted } from "../../api-client";

type Props = {
  messageId?: string;
  sender?: Sender;
  message?: string;
  direction?: "send" | "receive";
  type?: "text" | "action" | "single_choice";
  onClick?: () => void;
  buttonChoices?: Choice[];
  createUserMessage?: (message: string) => void;
  actionType?: ActionType;
  actionCompleted?: boolean;
  bottomElement?: MutableRefObject<HTMLDivElement | null>;
};

const messageVariants = cva(
  "sm-flex sm-relative sm-m-4 sm-mb-0 sm-p-2 sm-rounded-md sm-text-sm sm-max-w-[80%]",
  {
    variants: {
      type: {
        receive: "sm-bg-primary-100 sm-ml-5",
        send: "sm-bg-primary-600 sm-text-white sm-justify-end",
      },
    },
  }
);

const ChatMessage = ({
  messageId = "",
  sender = "bot",
  message = "Hi there",
  type,
  direction,
  buttonChoices,
  createUserMessage = () => {},
  actionType = null,
  actionCompleted = false,
  bottomElement,
}: Props) => {
  const { setLoading } = useChatLoader();
  // Processing props
  const chatDirection = direction
    ? direction
    : sender === "user"
    ? "send"
    : "receive";
  const messageArray = message.split("\n");

  // Hooks and state variables
  const [showChoices, setShowChoices] = useState(false);
  const { setFlow } = useChat();

  useEffect(() => {
    if (type === "single_choice") {
      setShowChoices(true);
    }
  }, []);

  // Handle select choice by sending a new message from the user
  const selectChoice = (message: string) => {
    createUserMessage(message);
    setShowChoices(false);
    setLoading(true);
  };

  // Handle action for book_meeting
  useEffect(() => {
    if (actionCompleted === false && actionType === "book_meeting") {
      setFlow("schedule");
      setActionCompleted(messageId);
    }
  }, []);

  useEffect(() => {
    if (!bottomElement) return;
    if (!bottomElement.current) return;
    if (!showChoices) return;
    bottomElement?.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottomElement, showChoices]);

  return (
    <>
      <div
        className={`sm-flex ${
          chatDirection === "send" ? "sm-justify-end" : ""
        }`}
      >
        <div className={messageVariants({ type: chatDirection })}>
          {sender === "bot" && (
            <div className="sm-absolute sm-m-0 -sm-left-2 -sm-top-2 sm-flex sm-h-4 sm-w-4 sm-items-center sm-justify-center sm-rounded-full sm-bg-primary-600">
              <img
                src="https://app.saasmonk.ai/images/brand/logo-white.png"
                alt="Receive Logo"
                className="sm-object-contain sm-p-[2px]"
              />
            </div>
          )}
          <div className="sm-flex sm-flex-col">
            {messageArray.map((message, index) => (
              <p key={index} className="sm-whitespace-pre-wrap sm-m-0">
                {message}
              </p>
            ))}
          </div>
        </div>
      </div>
      {showChoices && (
        <div className="sm-flex sm-justify-end">
          <div className="sm-m-3 sm-mb-0 sm-mr-4 sm-flex sm-max-w-[80%] sm-flex-wrap sm-justify-end">
            {buttonChoices?.map((choice: Choice, index) => (
              <Button
                key={index}
                className="sm-ml-2 sm-mt-3 sm-border-2 sm-border-primary-200 hover:sm-bg-primary-100 sm-bg-primary-50"
                variant={"outline"}
                onClick={() => {
                  selectChoice(choice.value);
                }}
              >
                {choice.value}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
