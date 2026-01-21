import React, { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

type RippleButtonProps = {
  text: string;
  duration: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        className="relative overflow-hidden shadow-xl transition-colors duration-300 bg-teal-600 hover:bg-teal-700" // radix ui has a button active filter to reduce the brightness
        onClick={handleClick}
      >
        <span className="z-10">{text}</span>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="bg-teal-950 absolute rounded-full"
              initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration / 1000, ease: "easeOut" }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
