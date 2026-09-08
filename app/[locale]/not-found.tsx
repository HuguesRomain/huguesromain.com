import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-[13px] font-medium uppercase tracking-[0.06em] text-text-muted">
        404
      </p>
      <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
        Page introuvable
      </h1>
      <p className="max-w-md text-[15px] leading-[1.6] text-text-muted">
        Cette page n&apos;existe pas — this page does not exist.
      </p>
      <Link
        href="/"
        className="rounded-full border border-surface-border bg-surface px-6 py-3 text-[14px] font-medium text-text-muted transition-colors hover:text-text"
      >
        ← Retour / Back
      </Link>
    </section>
  );
}
