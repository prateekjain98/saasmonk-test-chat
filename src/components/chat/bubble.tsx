import { useChat } from "../../store";
import { Button } from "../ui/button";

const ChatBubble = () => {
  const { setPanelVisible, setMenuVisible, clearBotMessages } = useChat();

  return (
    <Button
      variant={"chat"}
      size={"chat"}
      onClick={() => {
        setPanelVisible(true);
        setMenuVisible(false);
        clearBotMessages();
      }}
      className="!sm-z-[100000000000]"
    >
      <img
        src="https://app.saasmonk.ai/images/brand/logo-white.png"
        alt="Saasmonk Logo"
        width={30}
        height={30}
        className="sm-m-auto"
      />
    </Button>
  );
};

export default ChatBubble;
