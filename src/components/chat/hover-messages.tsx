import { useChat } from "../../store";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const HoverMessages = () => {
  // Hooks and state variables
  const { botMessages, clearBotMessages, setFlow, setPanelVisible } = useChat();

  // Clear bot messages on close
  const handleClose = () => {
    clearBotMessages();
  };

  // Open chat on click
  const openChat = () => {
    clearBotMessages();
    setFlow("chat");
    setPanelVisible(true);
  };

  return (
    <div className="sm-fixed sm-bottom-28 sm-right-10">
      <div className="sm-flex sm-justify-end">
        <Button
          className="sm-bg-primary-50"
          size={"icon"}
          onClick={handleClose}
        >
          <X size={20} color="#0F172A" />
        </Button>
      </div>
      {botMessages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="sm-mt-3 sm-flex sm-cursor-pointer sm-justify-end"
          onClick={openChat}
        >
          {index === 0 ? (
            <div className="sm-relative">
              <div className="sm-absolute -sm-left-6 sm-flex sm-h-full sm-w-12 sm-items-center sm-justify-center sm-rounded-full">
                <img
                  src="https://app.saasmonk.ai/images/brand/monk-bot.png"
                  alt="Receive Logo"
                  className="sm-h-12 sm-object-contain sm-p-[2px]"
                />
              </div>
              <div className="sm-flex sm-min-h-[52px] sm-min-w-[200px] sm-max-w-[330px] sm-flex-col sm-justify-center sm-rounded-lg sm-bg-white sm-p-2 sm-pl-8 sm-shadow-lg">
                <p className="sm-text-xs sm-text-gray-400">MonkBot</p>
                {message.message}
              </div>
            </div>
          ) : (
            <div className="sm-flex sm-min-h-[52px] sm-min-w-[200px] sm-max-w-[300px] sm-flex-col sm-rounded-lg sm-bg-white sm-p-2 sm-shadow-lg">
              {message.message}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
export default HoverMessages;
