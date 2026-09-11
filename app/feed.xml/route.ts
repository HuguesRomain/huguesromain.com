import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export function GET() {
  return NextResponse.redirect(`${SITE_URL}/en/feed.xml`, 307);
}