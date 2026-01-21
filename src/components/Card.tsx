import * as React from "react";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MessageSquareQuote } from "lucide-react";
import Tag from "./Tag";
import { Button } from "./ui/button";

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  contentClassName?: string;
} & PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export default function Card({
  title,
  description,
  contentClassName,
  className,
  tags,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl flex flex-col justify-start shadow-xl bg-white",
        className,
      )}
      {...props}
    >
      <div className="p-2">
        <section
          className={cn(
            "relative bg-accent rounded-2xl flex justify-center items-center overflow-hidden",
            contentClassName,
          )}
        >
          {children}
        </section>
      </div>
      <div className="px-4 flex justify-between items-center gap-3 mb-3">
        <div className="space-y-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm/4 tracking-tight text-muted-foreground">{description}</p>
        </div>
        <Button
          variant={"outline"}
          className="group w-10 h-10 transition-colors duration-300 hover:cursor-pointer hover:bg-background"
        >
          <MessageSquareQuote className="stroke-2 stroke-primary/40 group-hover:stroke-primary transition-colors duration-300" />
        </Button>
      </div>
      <Separator />
      <div className="my-3 px-4 flex flex-row-reverse gap-2">
        {tags.map((tagName) => (
          <Tag key={title + tagName} tagName={tagName} />
        ))}
      </div>
    </div>
  );
}
