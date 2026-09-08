import type { Metadata } from "next";
import { AsciiLabClient } from "./ascii-lab-client";

export const metadata: Metadata = {
  title: "Lab — moteur ASCII",
  robots: { index: false, follow: false },
};

export default function AsciiLabPage() {
  return <AsciiLabClient />;
}
