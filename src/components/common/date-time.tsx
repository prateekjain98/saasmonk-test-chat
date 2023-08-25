import { type DateDisplayVariants, type DateTimeFormat } from "../../typing";
import { format as formatDate } from "date-fns";

type Props = {
  dateTime?: Date;
  format?: DateTimeFormat;
  variant?: DateDisplayVariants;
};

const formattedDateTime = (dateTime: Date, format: DateTimeFormat) => {
  switch (format) {
    case "day-time":
      return formatDate(dateTime, "dd MMM, HH:mm");
    case "date-month":
      return formatDate(dateTime, "dd MMM");
    case "day-month-date":
      return formatDate(dateTime, "EEE, MMM d");
  }
};

const DateTime = ({
  dateTime = new Date(),
  format = "day-time",
  variant = "chat",
}: Props) => {
  return (
    <div
      className={`sm-flex sm-p-3 sm-pb-0 ${
        variant === "chat"
          ? "sm-justify-center sm-text-xs sm-font-light"
          : "sm-font-semibold"
      }`}
    >
      {formattedDateTime(dateTime, format)}
    </div>
  );
};

export default DateTime;
