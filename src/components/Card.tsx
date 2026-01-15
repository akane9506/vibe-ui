import { Box, Text } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

type CardProps = {
  title: string;
} & PropsWithChildren;

export default function Card({ title, children }: CardProps) {
  return (
    <Box className="w-fit p-0.5 rounded-[18px] flex flex-col gap-1 justify-between bg-linear-to-b from-(--accent-1) to-(--accent-9) shadow-xs hover:from-(--accent-9) transition-colors duration-200">
      <Box
        className="relative z-10 w-70 h-70 flex justify-center items-center rounded-2xl bg-(--color-background) bg-[radial-gradient(circle,var(--gray-4)_1px,transparent_1px)] 
bg-size-[12px_12px] "
      >
        {children}
      </Box>
      <Text
        weight="bold"
        size="2"
        align="center"
        as="p"
        className="text-(--accent-1) py-0.5"
      >
        {title}
      </Text>
    </Box>
  );
}
