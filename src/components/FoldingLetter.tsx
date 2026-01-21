import { useState, useEffect, useTransition, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const sampleText = `Dear Reader,

You ask what compelled me to write The Duel, and whether I intended it as a judgment upon the men who inhabit its pages. I must answer honestly: I do not judge them. I merely observe.

Laevsky’s weakness, so often condemned, seemed to me neither exceptional nor monstrous. On the contrary, it is painfully common. He is a man who understands how he ought to live, yet lacks the strength to live in accordance with that understanding.

With sincere respect,
Anton Chekhov
`;

// const sampleTextCN = `亲爱的读者：

//     你询问我为何写下《决斗》，以及我是否意在对书中人物作出评判。对此，我必须坦率地回答：我并不评判他们，我只是观察。
//     莱夫斯基的软弱常常受到指责，但在我看来，它既不特殊，也不怪异。恰恰相反，它过于普遍了。他明白自己应当如何生活，却缺乏按照这种理解去生活的力量。正是这种“知道”与“行动”之间的裂隙，比任何道德结论都更令我感兴趣。生活并不提供裁决，它只提供处境。

// 谨致敬意，
// 安东·契诃夫
// `;

function splitTextByLanguage(text: string) {
  // Check if text contains CJK characters
  const hasCJK = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/.test(text);
  return hasCJK ? text.split("") : text.split(/(\s+)/);
}

function splitTextIntoPages(
  units: string[],
  pageHeight: number,
  measurer: HTMLDivElement,
) {
  const tempPages: string[] = [];
  let currPage = "";
  for (const unit of units) {
    const textContent = currPage + unit;
    measurer.textContent = textContent;
    if (measurer.scrollHeight > pageHeight && currPage.trim()) {
      tempPages.push(currPage);
      currPage = unit;
      measurer.textContent = currPage;
    } else {
      currPage = textContent;
    }
  }
  if (currPage.trim()) {
    tempPages.push(currPage);
  }
  while (tempPages.length < 3) {
    tempPages.push("");
  }
  return tempPages;
}

type FoldingLetterProps = {
  text?: string;
  contentClassName?: string;
  measureClassName?: string;
};

export default function FoldingLetter({
  text,
  contentClassName,
  measureClassName,
}: FoldingLetterProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const measurerStyle = cn(
    "h-30 w-90 whitespace-pre-wrap text-sm px-3",
    measureClassName,
  );
  // the content style should be somewhat based on the measure style
  // especially the width and the height properties
  const contentStyle = cn(
    "relative w-90 h-30 bg-background shadow-xl box-content rounded-md",
    contentClassName,
  );
  const middlePageGradient = cn(
    "bg-linear-[180deg,var(--accent),var(--background)_10%,var(--background)_80%,var(--accent)]",
  );

  // page style
  const pageHeight = 120; //px

  useEffect(() => {
    startTransition(() => {
      if (!measureRef.current) return;
      const measurer = measureRef.current;
      const units = splitTextByLanguage(text ?? sampleText);
      const tempPages = splitTextIntoPages(units, pageHeight, measurer);
      setPages(tempPages);
    });
  }, [text]);

  const pagePadding = 12;

  return (
    <motion.div
      className={contentStyle}
      style={{ paddingTop: pagePadding, paddingBottom: pagePadding }}
      initial={{ height: pageHeight + 2 * pagePadding, rotateZ: 0 }}
      animate={{
        height: isExpanded
          ? pageHeight * 3 + 2 * pagePadding
          : pageHeight + 2 * pagePadding,
        rotateZ: isExpanded ? 2.5 : 0,
      }}
      transition={{
        type: "spring",
        bounce: isExpanded ? 0.15 : 0,
        visualDuration: 0.45,
      }}
    >
      {/* Hidden measurer */}
      {!isPending && (
        <div ref={measureRef} className={cn(measurerStyle, "fixed top-0 left-100")} />
      )}
      <div onClick={() => setIsExpanded((prev) => !prev)}>
        {!isPending &&
          pages.slice(0, 3).map((content, index) => {
            const top = isExpanded
              ? pageHeight * index + pagePadding // Page 0: -160, Page 1: 0, Page 2: 160
              : pagePadding; // All pages at center when folded
            const initialRotateX = index === 1 ? -180 : 0;
            return (
              <motion.div
                key={`${content.slice(0, 10)}-${index}`}
                className={cn(
                  "absolute left-0 overflow-hidden backface-hidden bg-background",
                  index === 1 && middlePageGradient,
                  measurerStyle,
                )}
                initial={{
                  top: top,
                  left: 0,
                  rotateX: initialRotateX,
                  zIndex: 2 - index,
                }}
                animate={{
                  top: top,
                  rotateX: isExpanded ? 0 : index === 1 ? -180 : 0,
                }}
                transition={{
                  type: "spring",
                  bounce: isExpanded ? 0.15 : 0,
                  visualDuration: index === 2 ? 0.45 : 0.5,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center",
                }}
              >
                {content}
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
}
