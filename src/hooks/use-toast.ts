
import * as React from "react";
import { useToast as useToastPrimitive } from "@/components/ui/toast";

export const useToast = useToastPrimitive;

export const toast = (props: Parameters<typeof useToast.toast>[0]) => {
  return useToast.toast(props);
};
