
// This is a wrapper around the toast component
import { toast as toastFunction } from "@/components/ui/toaster";

export const toast = toastFunction;

export const useToast = () => {
  return { toast: toastFunction };
};
