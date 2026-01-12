import { useState, type MouseEvent } from "react";
import { Button, Text, type ButtonProps } from "@radix-ui/themes";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

type RippleButtonProps = {
  text: string;
  duration: number; // millisecond
} & ButtonProps;

export default function RippleButton({ text, duration, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.5;
    const newRipple: Ripple = {
      x: mouseX,
      y: mouseY,
      size,
      id: Date.now() + Math.random(),
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, duration);
    props.onClick?.(event);
  };

  return (
    <Button
      size="3"
      radius="full"
      variant="solid"
      className="relative overflow-hidden brightness-100 shadow-lg shadow-(color:--gray-8)" // radix ui has a button active filter to reduce the brightness
      onClick={handleClick}
    >
      <Text weight="medium" className="z-10">
        {text}
      </Text>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: "easeOut" }}
            style={{
              position: "absolute",
              background: "var(--accent-12)",
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: "100%",
            }}
          />
        ))}
      </AnimatePresence>
    </Button>
  );
}
