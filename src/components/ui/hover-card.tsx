
import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
}

interface HoverCardTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const HoverCardContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

export const HoverCard = ({ children }: HoverCardProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <HoverCardContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </HoverCardContext.Provider>
  );
};

export const HoverCardTrigger = ({
  children,
  asChild,
}: HoverCardTriggerProps) => {
  const { setOpen } = React.useContext(HoverCardContext);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    });
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
};

export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(
  (
    { className, align = "center", sideOffset = 4, children, ...props },
    ref
  ) => {
    const { open } = React.useContext(HoverCardContext);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
          {
            "left-0": align === "start",
            "left-1/2 -translate-x-1/2": align === "center",
            "right-0": align === "end",
          },
          className
        )}
        style={{
          top: `calc(100% + ${sideOffset}px)`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HoverCardContent.displayName = "HoverCardContent";
