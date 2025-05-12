
import { useState } from "react";

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
const TOAST_REMOVE_DELAY = 1000;

export const useToast = () => {
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

  return {
    toast,
    dismiss,
    toasts,
  };
};

// Export a singleton instance of the toast function
const { toast } = useToast();
export { toast };
