type Props = {
  dateTime?: string;
};

const ChatTime = ({ dateTime = "Today, 5:00pm" }: Props) => {
  return (
    <div className="sm-text-xs sm-flex sm-font-light sm-justify-center sm-pt-2">
      {dateTime}
    </div>
  );
};

export default ChatTime;
