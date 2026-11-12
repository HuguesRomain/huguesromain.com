import type { Offer, Profile } from "@/content/types";
import { Card } from "./card";

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card
      className={`flex h-full flex-col gap-4 p-5 sm:p-6 ${
        offer.highlight ? "border-accent/40" : ""
      }`}
    >
      <span
        className={`self-start rounded-full px-2.5 py-1 font-mono text-[11px] ${
          offer.highlight
            ? "bg-accent/10 text-accent"
            : "bg-surface text-text-muted"
        }`}
      >
        {offer.tag}
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em]">
          {offer.title}
        </h3>
        <p className="text-[14px] leading-[1.55] text-text-muted">
          {offer.audience}
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {offer.bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative pl-4 text-[14px] leading-[1.5] text-text before:absolute before:left-0 before:top-[0.7em] before:h-[1.5px] before:w-1.5 before:bg-text-muted"
          >
            {bullet}
          </li>
        ))}
      </ul>
      <p className="mt-auto border-t border-surface-border pt-3 text-[12px] text-text-muted">
        {offer.format}
      </p>
    </Card>
  );
}

export function OffersContent({ profile }: { profile: Profile }) {
  const { offers, contact } = profile;
  const [automation, ...others] = [...offers.items].sort(
    (a, b) => Number(Boolean(b.highlight)) - Number(Boolean(a.highlight)),
  );

  return (
    <div className="flex flex-col gap-5">
      <OfferCard offer={automation} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {others.map((offer) => (
          <OfferCard key={offer.title} offer={offer} />
        ))}
      </div>
      <a
        href={contact.booking}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex h-11 items-center justify-center self-center rounded-full px-5 text-[14px] font-medium text-[#f4f1ee] transition-[filter] duration-200 hover:brightness-125"
        style={{
          background: "linear-gradient(180deg, #202020, #000)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        {offers.cta.label} ↗
      </a>
    </div>
  );
}
