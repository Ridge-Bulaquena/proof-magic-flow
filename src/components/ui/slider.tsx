
import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue = [0],
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      value || defaultValue
    );

    const percentage = React.useMemo(() => {
      const val = value || internalValue;
      return ((val[0] - min) / (max - min)) * 100;
    }, [value, internalValue, min, max]);

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      const newValues = [newValue];
      setInternalValue(newValues);
      
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalValue[0]}
          onChange={handleChange}
          className="absolute h-2 w-full cursor-pointer opacity-0"
          aria-label="Slider"
        />
        <div
          className="absolute h-5 w-5 cursor-grab rounded-full border-2 border-primary bg-background"
          style={{
            left: `calc(${percentage}% - 10px)`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";
