import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "sm-inline-flex sm-items-center sm-justify-center sm-rounded-md sm-text-sm sm-font-medium sm-ring-offset-background sm-transition-colors focus-visible:sm-outline-none focus-visible:sm-ring-2 focus-visible:sm-ring-ring focus-visible:sm-ring-offset-2 disabled:sm-pointer-events-none disabled:sm-opacity-50",
  {
    variants: {
      variant: {
        default:
          "sm-bg-primary sm-text-primary-foreground hover:sm-bg-opacity-80",
        destructive:
          "sm-bg-destructive sm-text-destructive-foreground hover:sm-bg-destructive/90",
        outline:
          "sm-border sm-border-input sm-bg-background hover:sm-bg-accent hover:sm-text-accent-foreground",
        secondary:
          "sm-bg-secondary sm-text-secondary-foreground hover:sm-bg-secondary/80",
        ghost: "hover:sm-bg-accent hover:sm-text-accent-foreground",
        link: "sm-text-primary sm-underline-offset-4 hover:sm-underline",
        chat: "sm-fixed sm-bottom-10 sm-right-10 sm-flex !sm-rounded-full sm-bg-primary-600 hover:sm-bg-opacity-80 sm-shadow-lg",
      },
      size: {
        default: "sm-h-10 sm-px-4 sm-py-2",
        sm: "sm-h-9 sm-rounded-md sm-px-3",
        lg: "sm-h-11 sm-rounded-md sm-px-8",
        icon: "sm-h-10 sm-w-10",
        chat: "sm-h-14 sm-w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
