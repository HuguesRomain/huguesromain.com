import Image from "next/image";
import type { Locale } from "@/content/types";
import { BentoCard, CardLabel } from "./card";

const CLIENTS = [
  { name: "Savoir", image: "/images/projects/savoir-icon.png" },
  { name: "Lead Genius" },
  { name: "Teamway", image: "/images/projects/teamway-logo.png" },
  { name: "Champagne Dupont" },
  { name: "HomeExchange" },
  { name: "Aleteia" },
] as const;

export function ClientsCard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <BentoCard className="col-span-6 lg:col-span-2">
      <div className="flex h-full flex-col gap-6 p-7">
        <CardLabel>
          {fr ? "Ils m'ont fait confiance" : "Trusted by"}
        </CardLabel>
        <ul className="flex flex-1 flex-col justify-center gap-3.5">
          {CLIENTS.map((client) => (
            <li key={client.name} className="flex items-center gap-3">
              {"image" in client && client.image ? (
                <Image
                  src={client.image}
                  alt=""
                  width={40}
                  height={40}
                  className="size-5 rounded-[5px] object-contain opacity-70 grayscale dark:invert"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-5 items-center justify-center rounded-[5px] border border-surface-border text-[9px] font-semibold text-text-muted"
                >
                  {client.name[0]}
                </span>
              )}
              <span className="text-[14px] font-medium text-text-muted">
                {client.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}
