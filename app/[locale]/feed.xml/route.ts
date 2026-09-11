import { isLocale } from "@/content/get-profile";
import { getPosts } from "@/lib/blog";
import { PERSON_NAME, SITE_URL } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }
  const posts = getPosts(locale);
  const channelTitle =
    locale === "fr"
      ? `${PERSON_NAME} — Notes d'ingénierie`
      : `${PERSON_NAME} — Engineering notes`;
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${SITE_URL}/${locale}/blog</link>
    <description>${escapeXml(channelTitle)}</description>
    <language>${locale}</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}