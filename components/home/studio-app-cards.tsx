import Image from "next/image";
import { getStudioApps } from "@/content/studio-apps";
import type { Locale } from "@/content/types";

export function StudioAppCards({ locale }: { locale: Locale }) {
  const apps = getStudioApps(locale);
  const openLabel = locale === "fr" ? "ouvre un nouvel onglet" : "opens in a new tab";

  return (
    <div className="grid grid-cols-3 gap-2">
      {apps.map((app) => (
        <a
          key={app.slug}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${app.name} (${openLabel})`}
          className="flex min-w-0 flex-col items-center gap-2 rounded-[16px] border border-surface-border bg-surface px-2 py-3 text-center transition-colors hover:border-accent sm:px-3"
        >
          <span className="flex size-10 shrink-0 overflow-hidden rounded-[11px] border border-surface-border sm:size-11 sm:rounded-[12px]">
            <Image
              src={app.icon}
              alt=""
              width={44}
              height={44}
              className="size-full object-cover"
            />
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[12px] font-semibold leading-tight tracking-[-0.01em] text-text sm:text-[13px]">
              {app.name}
            </span>
            {app.description ? (
              <span className="text-[11px] leading-snug text-text-muted">
                {app.description}
              </span>
            ) : null}
          </span>
        </a>
      ))}
    </div>
  );
}
