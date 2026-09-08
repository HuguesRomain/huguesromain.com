import type { Locale } from "@/content/types";
import { getContributions, GITHUB_PROFILE_URL } from "@/lib/github";
import { Card } from "./card";
import { Section } from "./section";

const LEVEL_PERCENT = [0, 25, 50, 75, 100] as const;

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

export async function Contributions({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getContributions();
  if (!data || data.days.length === 0) return null;

  const days = data.days;
  const firstWeekday = new Date(days[0]!.date).getDay();
  const leadingEmpty = (firstWeekday + 6) % 7;
  const weeks: ((typeof days)[number] | null)[][] = [];
  let current: ((typeof days)[number] | null)[] = Array.from(
    { length: leadingEmpty },
    () => null,
  );
  for (const day of days) {
    current.push(day);
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
    <Section
      title="Contributions"
      action={
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-text-muted transition-colors hover:text-text"
        >
          GitHub ↗
        </a>
      }
    >
      <Card className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-col gap-1.5">
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
          <div
            className="grid gap-[2px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
            }}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
                {week.map((day, dayIndex) => (
                  <span
                    key={day?.date ?? `empty-${weekIndex}-${dayIndex}`}
                    title={
                      day
                        ? `${day.count} ${fr ? "contributions le" : "contributions on"} ${day.date}`
                        : undefined
                    }
                    className="w-full rounded-[25%]"
                    style={{
                      aspectRatio: "1 / 1",
                      background:
                        day && day.level > 0
                          ? `color-mix(in srgb, var(--accent) ${LEVEL_PERCENT[day.level]}%, var(--contrib-empty))`
                          : "var(--contrib-empty)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="text-[13px] text-text-muted">
          <span className="font-semibold text-text">
            {data.total.toLocaleString(fr ? "fr-FR" : "en-US")}
          </span>{" "}
          {fr
            ? "contributions sur les 12 derniers mois"
            : "contributions in the last year"}
        </p>
      </Card>
    </Section>
  );
}
