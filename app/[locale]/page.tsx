import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/hero";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { StackSection } from "@/components/sections/stack";
import { WorkSection } from "@/components/sections/work";
import { getProfile, isLocale } from "@/content/get-profile";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const profile = getProfile(locale);

  return (
    <>
      <Hero profile={profile} />
      <WorkSection profile={profile} />
      <StackSection profile={profile} />
      <AboutSection profile={profile} />
      <ContactSection profile={profile} />
      <footer className="border-t border-surface-border px-6 py-8">
        <p className="mx-auto max-w-6xl text-center font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          © {new Date().getFullYear()} · {profile.footer}
        </p>
      </footer>
    </>
  );
}
