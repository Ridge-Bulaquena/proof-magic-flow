
import * as React from "react";
import { cn } from "@/lib/utils";

const PopoverContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | undefined>(undefined);

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ 
  children, 
  asChild 
}: { 
  children: React.ReactNode;
  asChild?: boolean;
}) {
  const context = React.useContext(PopoverContext);
  
  if (!context) {
    throw new Error("PopoverTrigger must be used within a Popover");
  }
  
  const { open, setOpen } = context;
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: React.MouseEvent) => {
        setOpen(!open);
        if ((children as any).props.onClick) {
          (children as any).props.onClick(e);
        }
      },
    });
  }
  
  return (
    <button onClick={() => setOpen(!open)} type="button">
      {children}
    </button>
  );
}

export function PopoverContent({ 
  children,
  align = "center",
  className,
}: { 
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}) {
  const context = React.useContext(PopoverContext);
  
  if (!context) {
    throw new Error("PopoverContent must be used within a Popover");
  }
  
  const { open } = context;
  
  if (!open) {
    return null;
  }
  
  return (
    <div 
      className={cn(
        "absolute z-50 mt-2 rounded-md border bg-popover p-4 shadow-md outline-none",
        {
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
          "right-0": align === "end",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
