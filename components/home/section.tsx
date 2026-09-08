import type { ReactNode } from "react";

export function Section({
  id,
  title,
  action,
  children,
}: {
  id?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-muted">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
