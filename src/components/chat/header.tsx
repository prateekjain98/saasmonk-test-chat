import { useChat } from "../../store";
import { Button } from "../ui/button";
import { Conversation, PanelType } from "~/typing";
import { Calendar, ChevronLeft, Video, X } from "lucide-react";
import staticData from "../../utils/staticData";

type Props = {
  type?: PanelType;
  conversation?: Conversation;
};

const ChatHeader = ({ type }: Props) => {
  const { setBubbleVisible, setPanelVisible, flow, setFlow } = useChat();

  // Close the chat panel
  const handleClose = () => {
    setBubbleVisible(true);
    setPanelVisible(false);
  };

  // Go back to previous flow
  const handleScheduleBack = () => {
    setFlow("chat");
  };

  // Handle book meeting
  const handleBookMeeting = () => {
    setFlow("schedule");
  };

  return (
    <>
      {type === "user" && flow === "schedule" ? (
        <div className="sm-flex sm-h-14 sm-items-center sm-bg-primary-600 sm-px-2">
          <Button
            className="sm-bg-transparent"
            size={"icon"}
            onClick={handleScheduleBack}
          >
            <ChevronLeft size={24} color="white" />
          </Button>
          <div className="sm-flex sm-w-full sm-justify-center sm-text-white">
            Book a meeting
          </div>
        </div>
      ) : (
        <div
          className={`sm-flex sm-h-14 sm-items-center sm-justify-between sm-px-2 ${"sm-bg-primary-600"}`}
        >
          <div className="sm-flex">
            <Button
              className="sm-bg-transparent"
              size={"icon"}
              onClick={handleScheduleBack}
            >
              <ChevronLeft size={24} color="white" />
            </Button>
            <img
              src={"https://app.saasmonk.ai/images/brand/monk-bot.png"}
              alt="Saasmonk Logo"
              width={32}
              height={32}
              className={`sm-m-auto sm-rounded-full`}
            />
            <p className="sm-m-auto sm-ml-2 sm-text-white">MonkBot</p>
          </div>
          <Button
            className="sm-bg-transparent"
            size={"icon"}
            onClick={handleClose}
          >
            <X size={24} color="white" />
          </Button>
        </div>
      )}
      {type === "user" && flow === "chat" && (
        <div className="sm-flex sm-items-center sm-justify-center sm-p-2 sm-gap-2 sm-rounded-b-lg sm-shadow-md">
          <Button className="sm-bg-success-600 sm-text-sm">
            <Video size={20} color="white" className="sm-mr-1" />
            <p>{staticData.agent_talk}</p>
          </Button>
          <Button className="sm-bg-secondary-600" onClick={handleBookMeeting}>
            <Calendar size={20} color="white" className="sm-mr-1" />
            <p>{staticData.agent_schedule}</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
