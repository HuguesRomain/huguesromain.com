const GITHUB_USERNAME = "HuguesRomain";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Contributions = {
  total: number;
  weeks: (ContributionDay | null)[][];
};

const LEVEL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type GraphQLDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  weekday: number;
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: GraphQLDay[] }[];
        };
      };
    } | null;
  };
};

const QUERY = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
            weekday
          }
        }
      }
    }
  }
}`;

function token(): string | undefined {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
}

export async function getContributions(): Promise<Contributions | null> {
  const auth = token();
  if (!auth) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "hugues-romain-site",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLResponse;
    const calendar =
      json.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) return null;

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => {
        const cells: (ContributionDay | null)[] = Array.from(
          { length: 7 },
          () => null,
        );
        for (const day of week.contributionDays) {
          if (day.weekday < 0 || day.weekday > 6) continue;
          cells[day.weekday] = {
            date: day.date,
            count: day.contributionCount,
            level: LEVEL[day.contributionLevel] ?? 0,
          };
        }
        return cells;
      }),
    };
  } catch {
    return null;
  }
}

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
