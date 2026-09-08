import type { Locale } from "@/content/types";
import { getContributions, GITHUB_PROFILE_URL } from "@/lib/github";
import { BentoCard, CardLabel } from "./card";

const LEVEL_OPACITY = ["", "0.25", "0.5", "0.75", "1"] as const;

const MONTHS_FR = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];
const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export async function ContributionsCard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getContributions();
  if (!data || data.days.length === 0) return null;

  const days = data.days;
  const firstWeekday = new Date(days[0]!.date).getDay();
  const leadingEmpty = (firstWeekday + 6) % 7;
  const cells: (typeof days)[number][] = [];
  const weeks: ((typeof days)[number] | null)[][] = [];
  let current: ((typeof days)[number] | null)[] = Array.from(
    { length: leadingEmpty },
    () => null,
  );
  for (const day of days) {
    current.push(day);
    cells.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  const months = fr ? MONTHS_FR : MONTHS_EN;
  const monthLabels: { index: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const firstDay = week.find((day) => day !== null);
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ index, label: months[month] ?? "" });
      lastMonth = month;
    }
  });

  return (
    <BentoCard className="col-span-6 lg:col-span-4">
      <div className="flex h-full flex-col justify-between gap-6 p-7">
        <div className="flex items-baseline justify-between gap-4">
          <CardLabel>{fr ? "Contributions" : "Contributions"}</CardLabel>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-text-muted transition-colors hover:text-text"
          >
            GitHub ↗
          </a>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-[640px] flex-col gap-1.5">
            <div className="relative h-4">
              {monthLabels.map((month) => (
                <span
                  key={`${month.label}-${month.index}`}
                  className="absolute text-[10px] text-text-muted"
                  style={{ left: `${(month.index / weeks.length) * 100}%` }}
                >
                  {month.label}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <span
                      key={day?.date ?? `empty-${weekIndex}-${dayIndex}`}
                      title={
                        day
                          ? `${day.count} ${fr ? "contributions le" : "contributions on"} ${day.date}`
                          : undefined
                      }
                      className="size-[10px] rounded-[3px]"
                      style={{
                        background:
                          day && day.level > 0
                            ? `color-mix(in srgb, var(--accent) ${Number(LEVEL_OPACITY[day.level]) * 100}%, var(--contrib-empty))`
                            : "var(--contrib-empty)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[14px] text-text-muted">
          <span className="font-semibold text-text">
            {data.total.toLocaleString(fr ? "fr-FR" : "en-US")}
          </span>{" "}
          {fr
            ? "contributions sur les 12 derniers mois"
            : "contributions in the last year"}
        </p>
      </div>
    </BentoCard>
  );
}
