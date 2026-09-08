import Link from "next/link";
import { MonoLabel } from "@/components/ui/mono-label";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center gap-8 px-6 text-center">
      <MonoLabel>404 / NOT FOUND</MonoLabel>
      <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] leading-[1.02] tracking-[-0.02em]">
        Page <em>introuvable</em>
      </h1>
      <p className="max-w-md font-mono text-[12px] uppercase leading-[1.8] tracking-[0.08em] text-text-muted">
        Cette page n&apos;existe pas — this page does not exist.
      </p>
      <Link
        href="/"
        className="rounded-full border border-surface-border bg-surface px-6 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text"
      >
        ← Retour / Back
      </Link>
    </section>
  );
}
