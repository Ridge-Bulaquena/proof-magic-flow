
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type SelectContextType = {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

export interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

export function Select({
  children,
  value,
  onValueChange,
  defaultValue,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value || defaultValue || "");

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleValueChange = React.useCallback((newValue: string) => {
    setInternalValue(newValue);
    onValueChange(newValue);
    setOpen(false);
  }, [onValueChange]);

  return (
    <SelectContext.Provider value={{ value: internalValue, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export function SelectTrigger({ className, children }: SelectTriggerProps) {
  const context = React.useContext(SelectContext);
  
  if (!context) {
    throw new Error("SelectTrigger must be used within a Select");
  }
  
  const { open, setOpen } = context;
  
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext);
  
  if (!context) {
    throw new Error("SelectValue must be used within a Select");
  }
  
  const { value } = context;
  
  return <span>{value || placeholder}</span>;
}

export interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className }: SelectContentProps) {
  const context = React.useContext(SelectContext);
  
  if (!context) {
    throw new Error("SelectContent must be used within a Select");
  }
  
  const { open } = context;
  
  if (!open) {
    return null;
  }
  
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "top-full mt-1 max-h-[var(--radix-select-content-available-height)] w-full overflow-auto",
        className
      )}
    >
      <div className="w-full p-1">{children}</div>
    </div>
  );
}

export interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export function SelectItem({ children, value, disabled, className }: SelectItemProps) {
  const context = React.useContext(SelectContext);
  
  if (!context) {
    throw new Error("SelectItem must be used within a Select");
  }
  
  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;
  
  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={() => !disabled && onValueChange(value)}
    >
      {children}
      {isSelected && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          ✓
        </span>
      )}
    </div>
  );
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div className="p-1">{children}</div>;
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
  return <div className="py-1.5 pl-2 pr-2 text-sm font-semibold">{children}</div>;
}
