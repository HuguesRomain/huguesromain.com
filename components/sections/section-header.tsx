import { MonoLabel } from "@/components/ui/mono-label";

export function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <MonoLabel>{label}</MonoLabel>
      <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}
