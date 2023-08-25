import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "sm-flex sm-h-10 sm-w-full sm-rounded-md sm-border sm-border-input sm-bg-background sm-px-3 sm-py-2 sm-text-sm sm-ring-offset-background file:sm-border-0 file:sm-bg-transparent file:sm-text-sm file:sm-font-medium placeholder:sm-text-muted-foreground focus-visible:sm-outline-none focus-visible:sm-ring-ring focus-visible:sm-ring-offset-2 disabled:sm-cursor-not-allowed disabled:sm-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
