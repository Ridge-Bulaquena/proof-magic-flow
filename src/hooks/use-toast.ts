
import { useState, createContext, useContext } from "react";

// This implements the toast notification system
export type Toast = {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

const TOAST_LIMIT = 5;

type ToasterType = {
  toasts: Toast[];
  toast: (props: Omit<Toast, "id">) => { id: string; dismiss: () => void };
  dismiss: (toastId?: string) => void;
};

// Create a context with default values
const ToastContext = createContext<ToasterType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { id, ...props };
    
    setToasts((prevToasts) => {
      const updatedToasts = [...prevToasts, newToast].slice(-TOAST_LIMIT);
      return updatedToasts;
    });

    // Auto-dismiss toast after duration
    if (props.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter(t => t.id !== id));
      }, props.duration || 5000);
    }

    return {
      id,
      dismiss: () => setToasts((prevToasts) => prevToasts.filter(t => t.id !== id)),
    };
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      setToasts((prevToasts) => prevToasts.filter(t => t.id !== toastId));
    } else {
      setToasts([]);
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    // When not in context, provide a fallback implementation
    return {
      toast: () => ({ id: "", dismiss: () => {} }),
      dismiss: () => {},
      toasts: [],
    };
  }
  return context;
};

// Singleton instance
export const toast = (props: Omit<Toast, "id">) => {
  const context = useContext(ToastContext);
  if (context) {
    return context.toast(props);
  }
  console.warn("Toast used outside of ToastProvider");
  return { id: "", dismiss: () => {} };
};
