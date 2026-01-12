import { Box, Text } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

type CardProps = {
  title: string;
} & PropsWithChildren;

export default function Card({ title, children }: CardProps) {
  return (
    <Box className="w-fit">
      <Box className="relative z-10 w-70 h-70 border border-(--gray-8) border-dashed flex justify-center items-center rounded-2xl bg-(--color-background) shadow-xl">
        {children}
      </Box>
      <Box className="relative h-14 -z-10 bg-(--accent-9) -translate-y-3 rounded-b-2xl flex items-end justify-center pb-3">
        <Text
          weight="medium"
          size="3"
          align="center"
          as="p"
          className="text-(--accent-1)"
        >
          {title}
        </Text>
      </Box>
    </Box>
  );
}
