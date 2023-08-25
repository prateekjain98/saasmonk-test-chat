import { AnimatePresence, motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useChat } from "../../store";
import { type Flow } from "../../typing";
import staticData from "../../utils/staticData";
import { Button } from "../ui/button";

const avatars = [
  {
    imageUrl:
      "https://ktkxgmiuwesvjuhbnany.supabase.co/storage/v1/object/public/ad-hoc-prod/AK-pic-low.jpg",
    fallbackText: "AK",
  },
  {
    imageUrl:
      "https://ktkxgmiuwesvjuhbnany.supabase.co/storage/v1/object/public/ad-hoc-prod/tanuj.jpeg",
    fallbackText: "TM",
  },
  {
    imageUrl:
      "https://ktkxgmiuwesvjuhbnany.supabase.co/storage/v1/object/public/ad-hoc-prod/siddharth.jpeg",
    fallbackText: "SG",
  },
];

const buttons: {
  text: string;
  flow: Flow;
}[] = [
  { text: staticData.chat_human, flow: "chat" },
  {
    text: staticData.schedule_demo,
    flow: "schedule",
  },
  {
    text: staticData.learn_more,
    flow: "faq",
  },
];

export const MenuButtons = () => {
  // Server interactions
  // const createCoversation = api.conversation.createConversation.useMutation();

  // Hooks and state variables
  const { setFlow, setPanelVisible } = useChat();

  return (
    <div className="sm-flex sm-flex-col sm-p-6">
      {buttons.map((button, index) => (
        <Button
          key={index}
          className="sm-mb-3 sm-bg-primary-200 !sm-text-primary hover:sm-bg-primary-300"
          onClick={() => {
            setPanelVisible(true);
            setFlow(button.flow);
            // createCoversation.mutate();
          }}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
};

const ChatMenu = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="saasmonk-chat-menu"
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className="sm-fixed sm-bottom-28 sm-right-10 sm-w-80 sm-overflow-hidden sm-rounded-lg !sm-z-[100000000000] sm-bg-primary-50"
      >
        <div className="sm-align-center sm-flex sm-h-40 sm-flex-col sm-justify-between sm-bg-primary-700 sm-p-8">
          <div className="sm-flex sm-h-10">
            {avatars.map((avatar, index) => (
              <Avatar key={index} className={index > 0 ? "-sm-ml-4" : ""}>
                <AvatarImage src={avatar.imageUrl} />
                <AvatarFallback>{avatar.fallbackText}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <h2 className="sm-mt-4 sm-text-lg sm-font-semibold sm-text-white">
            {staticData.menu_title}
          </h2>
          <p className="sm-mt-1 sm-text-xs sm-text-white">
            {staticData.menu_subtitle}
          </p>
        </div>
        <MenuButtons />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatMenu;
