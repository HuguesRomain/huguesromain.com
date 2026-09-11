import { Fragment, type ReactNode } from "react";

const LINK_HREF = "(?:https?:\\/\\/|mailto:|\\/(?!\\/))[^)\\s]+";
const INLINE_PATTERN = new RegExp(
  `(\\*\\*[^*]+\\*\\*|\`[^\`]+\`|\\[[^\\]]+\\]\\(${LINK_HREF}\\))`,
  "g",
);

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(INLINE_PATTERN);
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded-[3px] bg-surface px-1.5 py-0.5 text-[0.92em] text-text"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = new RegExp(`^\\[([^\\]]+)\\]\\((${LINK_HREF})\\)$`).exec(part);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-surface-border underline-offset-4 transition-colors hover:text-text"
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function Markdown({
  content,
  className = "flex flex-col gap-3 text-[15px] leading-[1.7] text-text",
}: {
  content: string;
  className?: string;
}) {
  const blocks = content.split(/\n{2,}/);
  return (
    <div className={className}>
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => /^\s*[-*] /.test(line.trim()) || line.trim() === "");
        if (isList && lines.some((line) => line.trim() !== "")) {
          return (
            <ul key={blockIndex} className="flex flex-col gap-1.5">
              {lines
                .filter((line) => line.trim() !== "")
                .map((line, lineIndex) => (
                  <li key={lineIndex} className="flex gap-2.5">
                    <span aria-hidden className="text-accent">
                      •
                    </span>
                    <span>
                      {renderInline(
                        line.trim().replace(/^[-*] /, ""),
                        `${blockIndex}-${lineIndex}`,
                      )}
                    </span>
                  </li>
                ))}
            </ul>
          );
        }
        return (
          <p key={blockIndex}>
            {lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                {renderInline(line, `${blockIndex}-${lineIndex}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
