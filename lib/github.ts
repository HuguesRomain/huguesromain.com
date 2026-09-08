const GITHUB_USERNAME = "huguesromain";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 21600 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as ApiResponse;
    return {
      total: data.total["lastYear"] ?? 0,
      days: data.contributions,
    };
  } catch {
    return null;
  }
}

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
