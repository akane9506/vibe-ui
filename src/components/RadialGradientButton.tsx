import { useRef, useState, useEffect, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

type RadialGradientButtonProps = {
  text: string;
  duration: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function RadialGradientButton({
  text,
  duration,
  ...props
}: RadialGradientButtonProps) {
  const [animationId, setAnimationId] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { onClick, ...buttonProps } = props;

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty("--mouse-x", `${x}%`);
    button.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnimationId(new Date().getTime());
    onClick?.(event);
  };

  useEffect(() => {
    if (buttonRef.current) {
      // setup mouse x and mouse y property when loading the component
      buttonRef.current.style.setProperty("--mouse-x", "100%");
      buttonRef.current.style.setProperty("--mouse-y", "100%");
    }
  }, [buttonRef]);

  return (
    <Button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative z-10 shadow-xl transition-colors duration-1000 bg-radial-[at_var(--mouse-x)_var(--mouse-y)] from-teal-400 to-teal-900 to-90%"
      {...buttonProps}
    >
      <span>{text}</span>
      <AnimatePresence>
        {animationId && animationId !== 0 && (
          <motion.div
            key={`button-ripple-${animationId}`}
            className="box-content absolute -z-10 top-[50%] left-[50%] translate-[-50%] w-full h-full rounded-xl bg-teal-700"
            initial={{
              opacity: 1,
              border: "1px solid var(--color-teal-700)",
            }}
            animate={{
              border: "20px solid var(--color-teal-700)",
              opacity: 0,
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut",
            }}
            onAnimationEnd={() => setAnimationId(0)}
          ></motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
