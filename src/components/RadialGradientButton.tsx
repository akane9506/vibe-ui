import { useRef, useState, useEffect, type MouseEvent } from "react";
import { Button, Text, type ButtonProps } from "@radix-ui/themes";
import { motion, AnimatePresence } from "motion/react";

type RadialGradientButtonProps = {
  text: string;
  duration?: number; // milliseconds
} & ButtonProps;

export default function RadialGradientButton({
  text,
  duration = 1000,
  ...props
}: RadialGradientButtonProps) {
  const [animationId, setAnimationId] = useState<number>(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty("--mouse-x", `${x}%`);
    button.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleClick = () => {
    setAnimationId(new Date().getTime());
  };

  useEffect(() => {
    if (buttonRef.current) {
      // setup mouse x and mouse y property when loading the component
      buttonRef.current.style.setProperty("--mouse-x", "50%");
      buttonRef.current.style.setProperty("--mouse-y", "50%");
    }
  }, [buttonRef]);

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        ref={buttonRef}
        size="3"
        radius="full"
        variant="solid"
        className="relative z-10 shadow-lg shadow-(color:--gray-8) transition-colors duration-1000"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--accent-7) 0%, var(--accent-9) 100%)`,
        }}
        {...props}
      >
        <Text weight="medium">{text}</Text>
        <AnimatePresence>
          {animationId && animationId !== 0 && (
            <motion.div
              key={`button-ripple-${animationId}`}
              className="box-content absolute -z-10 top-[50%] left-[50%] translate-[-50%] w-full rounded-full h-full var(--accent-7)"
              initial={{
                opacity: 1,
                border: "1px solid var(--accent-7)",
              }}
              animate={{
                border: "20px solid var(--accent-7)",
                opacity: 0,
              }}
              transition={{
                duration: duration / 1000,
                ease: "easeOut",
              }}
              onAnimationEnd={() => setAnimationId(0)}
            />
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
